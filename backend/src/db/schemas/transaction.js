import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
    {
        money: {
            type: Number,
            required: true,
        },

        date: {
            type: Date,
            default: Date.now,
        },

        description: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            enum: ['Groceries', 'Bills', 'Subscriptions', 'Travel', 'Medical', 'Gifts', 'Education', 'Savings', 'other'],
            required: true
        },
    }
)


const Transaction = model("Transaction", transactionSchema);

export default Transaction;