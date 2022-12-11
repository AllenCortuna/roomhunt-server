
import express from "express";
import { login, signup, verifyEmail } from "../controllers/admin/admin.js";

const router = express.Router();


router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);


export default router;
