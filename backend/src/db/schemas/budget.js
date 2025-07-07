import { Schema, model } from "mongoose";

const budgetSchema = new Schema(
    {
        month: {
            type: Date,
            required: true
        },

        category: {
            type: String,
            enum: ['Groceries', 'Bills', 'Subscriptions', 'Travel', 'Medical', 'Gifts', 'Education', 'Savings', 'other'],
            required: true
        },

        budget: {
            type: Number,
            required: true
        }
    }
);

const Budget = model("Budet", budgetSchema);
export default Budget;
