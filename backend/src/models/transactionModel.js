
import Transaction from "../db/schemas/transaction.js"

export class TransactionModel {

    async getAll() {
        try {
            return await Transaction.find();
        }

        catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findById(_id) {
        try {
            return await Transaction.findById(_id);
        }

        catch (error) {
            console.error(error);
            throw error;
        }
    }

    async save(transaction) {
        try {
            return await Transaction.insertOne(transaction)
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findByIdAndDelete(_id) {
        try {
            return await Transaction.findByIdAndDelete(_id);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findByIdAndUpdate(_id,transaction) {
        try {
            return await Transaction.findByIdAndUpdate(_id,transaction)
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}


export default TransactionModel