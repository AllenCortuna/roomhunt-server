import express from "express";
const router = express.Router();

import {
  login,
  signup,
  verifyEmail,
  getAcc
  // verifyAcc,
} from "../controllers/accommodator.js";

// router.post("/verify-acc", verifyAcc);
router.get('/:id', getAcc);
router.post("/login", login);
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);

export default router;
