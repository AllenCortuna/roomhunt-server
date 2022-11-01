import express from "express";
const router = express.Router();

import {
  login,
  signup,
  verifyEmail,
  // verifyAcc,
} from "../controllers/accommodator.js";

// router.get('/', getAccommodators);
// router.get('/', getAccommodator);
// router.post("/verify-acc", verifyAcc);
router.post("/login", login);
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);

export default router;
