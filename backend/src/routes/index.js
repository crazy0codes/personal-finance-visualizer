
import express from "express";
import transactionRoutes from "./transactionRoute.js"
import budgetRoutes from "./budgetRoute.js"

const router = express.Router();

router.use('/transaction', transactionRoutes)
router.use("/budgets", budgetRoutes)

export default router;