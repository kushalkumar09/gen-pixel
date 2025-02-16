/* eslint-disable camelcase */
import { createTransaction } from "@/lib/actions/transactions";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const body = await request.text();

  const razorpaySignature = request.headers.get("x-razorpay-signature") as string;
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;

  // Verify the Razorpay webhook signature
  const generatedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(body)
    .digest("hex");

  if (generatedSignature !== razorpaySignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  // Get the event type
  const eventType = event.event;

  // Handle "payment.captured" event
  if (eventType === "payment.captured") {
    const { id, amount, notes } = event.payload.payment.entity;

    const transaction:CreateTransactionParams = {
      razorpayId: id,
      amount: amount ? amount / 100 : 0, // Convert from smallest currency unit (e.g., paise to INR)
      plan: notes?.plan || "",
      credits: Number(notes?.credits) || 0,
      buyerId: notes?.buyerId || "",
      createdAt: new Date(),
    };

    const newTransaction = await createTransaction(transaction);

    return NextResponse.json({ message: "Transaction saved", transaction: newTransaction });
  }

  return new Response("", { status: 200 });
}
