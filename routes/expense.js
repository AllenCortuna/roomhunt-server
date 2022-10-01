import express from "express";
import {
  getExpenses,
  getExpense,
  getOwnExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controlers/expense.js";

import auth from "../middleware/auth.js";
const router = express.Router();

// WARNING: add auth for security

router.get("/", getExpenses);
router.get("/", getOwnExpenses);
router.post("/", createExpense);
router.get("/:id", getExpense);
router.patch("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
