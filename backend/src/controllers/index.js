import BudgetModel from "../models/budgetModel.js";
import TransactionModel from "../models/transactionModel.js";
import { BudgetController } from "./budgetController.js";
import { TransactionController } from "./transactionController.js";


const routes = {
    transaction: new TransactionController(new TransactionModel()),
    budget: new BudgetController(new BudgetModel())
}

export default routes;