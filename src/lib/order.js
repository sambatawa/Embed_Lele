import { ref, set, get, update, push, remove } from 'firebase/database';
import { db } from './firebase';

export const createOrder = async (orderData) => {
  try {
    const orderRef = ref(db, `orders/${orderData.orderId}`);
    await set(orderRef, {
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'pending',
      updatedAt: new Date().toISOString()
    });
    
    return { success: true, orderId: orderData.orderId };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message };
  }
};

export const getOrder = async (orderId) => {
  try {
    const orderRef = ref(db, `orders/${orderId}`);
    const snapshot = await get(orderRef);
    
    if (snapshot.exists()) {
      return { success: true, order: snapshot.val() };
    } else {
      return { success: false, error: 'Order not found' };
    }
  } catch (error) {
    console.error('Error getting order:', error);
    return { success: false, error: error.message };
  }
};

export const updateOrderStatus = async (orderId, status, additionalData = {}) => {
  try {
    const orderRef = ref(db, `orders/${orderId}`);
    await update(orderRef, {
      status,
      ...additionalData,
      updatedAt: new Date().toISOString()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { success: false, error: error.message };
  }
};

export const getOrdersByCustomer = async (customerEmail) => {
  try {
    const ordersRef = ref(db, 'orders');
    const snapshot = await get(ordersRef);
    
    if (snapshot.exists()) {
      const orders = snapshot.val();
      const customerOrders = Object.values(orders).filter(
        order => order.customerEmail === customerEmail
      );
      
      return { success: true, orders: customerOrders };
    } else {
      return { success: true, orders: [] };
    }
  } catch (error) {
    console.error('Error getting customer orders:', error);
    return { success: false, error: error.message };
  }
};

export const processPaymentNotification = async (notificationData) => {
  try {
    const { order_id, transaction_status, fraud_status, payment_type, transaction_id } = notificationData;
    
    const orderResult = await getOrder(order_id);
    if (!orderResult.success) {
      return { success: false, error: 'Order not found' };
    }
    
    let newStatus = 'pending';
    
    if (transaction_status === 'capture') {
      if (fraud_status === 'challenge') {
        newStatus = 'challenge';
      } else if (fraud_status === 'accept') {
        newStatus = 'success';
      }
    } else if (transaction_status === 'settlement') {
      newStatus = 'success';
    } else if (transaction_status === 'cancel' || transaction_status === 'deny') {
      newStatus = 'cancelled';
    } else if (transaction_status === 'expire') {
      newStatus = 'expired';
    } else if (transaction_status === 'pending') {
      newStatus = 'pending';
    }
    
    const updateData = {
      transactionStatus: transaction_status,
      fraudStatus: fraud_status,
      paymentType: payment_type,
      transactionId: transaction_id
    };
    
    const updateResult = await updateOrderStatus(order_id, newStatus, updateData);
    
    if (updateResult.success) {
      return { 
        success: true, 
        orderId: order_id, 
        status: newStatus,
        previousStatus: orderResult.order.status
      };
    } else {
      return { success: false, error: 'Failed to update order' };
    }
    
  } catch (error) {
    console.error('Error processing payment notification:', error);
    return { success: false, error: error.message };
  }
};

export const generateOrderId = (prefix = 'NUTRIMIX') => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `${prefix}-${timestamp}-${random}`;
};

export const validateOrderData = (orderData) => {
  const errors = [];
  
  if (!orderData.customerDetails?.firstName) {
    errors.push('First name is required');
  }
  
  if (!orderData.customerDetails?.email) {
    errors.push('Email is required');
  }
  
  if (!orderData.customerDetails?.phone) {
    errors.push('Phone number is required');
  }
  
  if (!orderData.itemDetails?.id) {
    errors.push('Product ID is required');
  }
  
  if (!orderData.itemDetails?.name) {
    errors.push('Product name is required');
  }
  
  if (!orderData.itemDetails?.price || orderData.itemDetails.price <= 0) {
    errors.push('Valid price is required');
  }
  
  return errors;
};