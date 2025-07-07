import mongoose from "mongoose";


export class TransactionController {
    constructor(transactionModel) {
        this.transactionModel = transactionModel;
    }

    save = async (req, res) => {
        try {
            const { money, date, description, category } = req.body;
            const transaction = await this.transactionModel.save({ money, date, description, category });

            res.status(201)
                .json(
                    {
                        success: true,
                        message: "Transaction added successfully",
                        transactionId: transaction._id
                    }
                )

        }
        catch (error) {
            console.log(error)
            res.status(500)
                .json({
                    success: false,
                    message: "Internal Server Error"
                })
        }
    }

    update = async (req, res) => {
        try {
            const { money, description, date, category } = req.body;
            const { id } = req.params;
            const transactionUpdated = {
                money,
                description,
                date,
                category
            }
            const transaction = await this.transactionModel.findByIdAndUpdate(id, transactionUpdated)

            res.status(200)
                .json(
                    {
                        success: true,
                        message: "Transaction updated successfully",
                        transactionId: transaction._id
                    }
                )
        }

        catch (error) {
            res.status(500)
                .json({
                    success: false,
                    message: "Internal Server Error"
                })
        }

    }

    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const transaction = await this.transactionModel.findByIdAndDelete(id);

            if (!transaction) return (
                res.status(404)
                    .json(
                        {
                            success: false,
                            message: "Invalid Transaction"
                        }
                    )
            )

            res.status(200)
                .json(
                    {
                        success: true,
                        message: "Transaction successfully deleted"
                    }
                )
        }
        catch (error) {
            res.status(500)
                .json({
                    success: false,
                    message: "Internal Server Error"
                })
        }
    }

    getAll = async (req, res) => {
        try {
            const transactions = await this.transactionModel.getAll();
            res.status(200)
                .json(
                    {
                        success: true,
                        transactions
                    }
                )
        }
        catch (error) {
            res.status(500)
                .json(
                    {
                        success: false,
                        message: "Internal server error"
                    }
                )
        }
    }

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const transaction = await this.transactionModel.findById(new mongoose.Types.ObjectId(id));

            if (!transaction) return (
                res.status(404)
                    .json(
                        {
                            success: false,
                            message: "Invalid Transaction id"
                        }
                    )
            )

            res.status(200)
                .json(
                    {
                        success: true,
                        message: transaction
                    }
                )
        }
        catch (error) {
            console.log(error)
            res.status(500)
                .json(
                    {
                        success: false,
                        message: "Internal server error"
                    }
                )
        }
    }
}
