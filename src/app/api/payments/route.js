import { NextRequest, NextResponse } from 'next/server';
import MidtransClient from 'midtrans-client';

const midtransClient = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-YOUR_SERVER_KEY',
  clientKey: process.env.MIDTRANS_CLIENT_KEY || 'SB-Mid-client-YOUR_CLIENT_KEY'
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerDetails, itemDetails } = body;

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

    const orderId = 'NUTRIMIX-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);

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
        'qris'
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

    const transaction = await midtransClient.createTransaction(parameter);
    
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

export async function POST_NOTIFICATION(request) {
  try {
    const body = await request.json();
    
    const notificationSignature = request.headers.get('x-callback-signature');
    
    const { order_id, transaction_status, fraud_status } = body;
    
    console.log('Payment notification received:', {
      orderId: order_id,
      status: transaction_status,
      fraud: fraud_status
    });
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Payment notification error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process notification' },
      { status: 500 }
    );
  }
}