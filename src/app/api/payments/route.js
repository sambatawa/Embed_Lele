import { NextRequest, NextResponse } from 'next/server';
import MidtransClient from 'midtrans-client';

// Midtrans Configuration
const midtransClient = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-YOUR_SERVER_KEY',
  clientKey: process.env.MIDTRANS_CLIENT_KEY || 'SB-Mid-client-YOUR_CLIENT_KEY'
});

// Payment API - Create Transaction
export async function POST(request) {
  try {
    const body = await request.json();
    const { customerDetails, itemDetails } = body;

    // Validation
    if (!customerDetails?.firstName || !customerDetails?.email || !customerDetails?.phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required customer details' },
        { status: 400 }
      );
    }

    if (!itemDetails?.id || !itemDetails?.name || !itemDetails?.price) {
      return NextResponse.json(
        { success: false, error: 'Missing required item details' },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = 'NUTRIMIX-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);

    // Midtrans transaction parameters
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: itemDetails.price, 
      },
      item_details: [{
        id: itemDetails.id,
        price: itemDetails.price,
        quantity: itemDetails.quantity || 1,
        name: itemDetails.name,
        brand: 'Nutrimix',
        category: 'Machinery',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      }],
      customer_details: {
        first_name: customerDetails.firstName,
        last_name: customerDetails.lastName || '',
        email: customerDetails.email,
        phone: customerDetails.phone,
        billing_address: {
          first_name: customerDetails.firstName,
          last_name: customerDetails.lastName || '',
          email: customerDetails.email,
          phone: customerDetails.phone,
          address: customerDetails.address || '',
          city: customerDetails.city || '',
          postal_code: customerDetails.postalCode || '',
          country_code: 'IDN'
        },
        shipping_address: {
          first_name: customerDetails.firstName,
          last_name: customerDetails.lastName || '',
          email: customerDetails.email,
          phone: customerDetails.phone,
          address: customerDetails.address || '',
          city: customerDetails.city || '',
          postal_code: customerDetails.postalCode || '',
          country_code: 'IDN'
        }
      },
      enabled_payments: [
        'credit_card',
        'gopay',
        'shopeepay',
        'dana', 
        'qris',
        'bca_va',
        'bni_va',
        'bri_va',
        'cimb_va',
        'permata_va',
        'other_va'
      ],
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        error: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/error`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/pending`
      },
      expiry: {
        unit: 'hours',
        duration: 24
      },
      custom_field1: customerDetails.email,
      custom_field2: 'Nutrimix Product Purchase',
      custom_field3: new Date().toISOString()
    };

    // Create transaction
    const transaction = await midtransClient.createTransaction(parameter);
    
    // Log transaction for tracking
    console.log('Transaction created:', {
      orderId,
      email: customerDetails.email,
      amount: itemDetails.price,
      snapToken: transaction.token
    });

    return NextResponse.json({
      success: true,
      snapToken: transaction.token,
      redirectUrl: transaction.redirect_url,
      orderId: orderId,
      grossAmount: itemDetails.price,
      customerEmail: customerDetails.email
    });

  } catch (error) {
    console.error('Midtrans API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create payment transaction',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// Handle payment notification (webhook)
export async function POST_NOTIFICATION(request) {
  try {
    const body = await request.json();
    
    // Verify notification signature (optional but recommended)
    const notificationSignature = request.headers.get('x-callback-signature');
    
    // Process the notification based on transaction status
    const { order_id, transaction_status, fraud_status } = body;
    
    console.log('Payment notification received:', {
      orderId: order_id,
      status: transaction_status,
      fraud: fraud_status
    });
    
    // Here you can:
    // 1. Update order status in database
    // 2. Send confirmation email to customer
    // 3. Trigger shipping process
    // 4. Update inventory
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Payment notification error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process notification' },
      { status: 500 }
    );
  }
}