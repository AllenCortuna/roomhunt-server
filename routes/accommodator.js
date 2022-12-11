import express from "express";
const router = express.Router();

import {
  login,
  signup,
  verifyEmail,
  getAcc,
  patchAcc,
  getFeaturedAcc
  // verifyAcc,
} from "../controllers/accommodator.js";

// router.post("/verify-acc", verifyAcc);
router.get("/getFeatured", getFeaturedAcc);
router.get('/:id', getAcc);
router.post("/login", login);
router.patch("/patch/:id", patchAcc);
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);

export default router;
