import MidtransClient from 'midtrans-client';
import { NextResponse } from 'next/server';

let snap = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

export async function POST(request) {
  const { id, productName, price } = await request.json();

  let parameter = {
    item_details: {
      name: productName,
      price: price,
      quantity: 1,
    },
    transaction_details: {
      order_id: id,
      gross_amount: price,
    },
  };

  const token = await snap.createTransactionToken(parameter);
  return NextResponse.json({ token });
}