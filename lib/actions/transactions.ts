"use server";

import Razorpay from 'razorpay';
import { connectToDatabase } from '../database/mongoose';
import Transaction from '../database/models/transaction.model';
import { updateCredits } from './user.actions';
import { handleError } from '../utils';


export async function checkoutCredits(transaction: CheckoutTransactionParams) {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_ID!,
        key_secret: process.env.RAZORPAY_SECRET_KEY!,
    });

    // Amount in the smallest currency unit (e.g., paise for INR)
    const amount = Number(transaction.amount) * 100;

    const options = {
        amount, // Amount in smallest currency unit
        currency: "INR", // Razorpay supports multiple currencies
        receipt: `receipt_${transaction.buyerId}`, // A unique identifier for the order
        notes: {
            plan: transaction.plan,
            credits: transaction.credits.toString(),
            buyerId: transaction.buyerId,
        },
    };

    try {
        const order = await razorpay.orders.create(options);
        return { orderId: order.id, amount: order.amount, currency: order.currency };
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        throw new Error("Failed to create Razorpay order");
    }
}

export async function createTransaction(transaction: CreateTransactionParams) {
    try {
        await connectToDatabase();

        // Create a new transaction with a buyerId
        const newTransaction = await Transaction.create({
            ...transaction, buyer: transaction.buyerId
        })

        await updateCredits(transaction.buyerId, transaction.credits);

        return JSON.parse(JSON.stringify(newTransaction));
    } catch (error) {
        handleError(error)
    }
}
