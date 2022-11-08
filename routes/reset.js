import express from "express";
import {
  resetAccPassword,
  resetAccPasswordOTP,
  resetClientPassword,
  resetClientPasswordOTP,
} from "../controllers/reset.js";

const router = express.Router();

// WARNING: add auth for security

router.post("/acc", resetAccPassword);
router.patch("/acc/:id", resetAccPasswordOTP);
router.post("/client", resetClientPassword);
router.patch("/client/:id", resetClientPasswordOTP);

export default router;
