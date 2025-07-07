import express from "express";
import routes from "../controllers/index.js"

const router = express.Router();

router.post("/add", routes.transaction.save)
router.put("/update/:id", routes.transaction.update)
router.delete("/delete/:id", routes.transaction.delete)
router.get("/", routes.transaction.getAll)
router.get("/:id", routes.transaction.getById);

export default router;