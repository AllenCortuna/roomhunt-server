import express from "express";
const router = express.Router();

import {
  login,
  signup,
  verifyEmail,
  getAcc,
  updateAcc
  // verifyAcc,
} from "../controllers/accommodator.js";

// router.post("/verify-acc", verifyAcc);
router.get('/:id', getAcc);
router.post("/login", login);
router.patch("/update", updateAcc);
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);

export default router;
