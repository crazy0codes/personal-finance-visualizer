
import express from "express"
import routes from "../controllers/index.js"

const router = express.Router()

router.post("/add", routes.budget.save)
router.get("/", routes.budget.getMonthBudgets)

export default router;