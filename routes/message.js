import express from "express";
import { getMessage, sendMessage } from "../controllers/message.js";

const router = express.Router();

// WARNING: add auth for security

router.get("/get", getMessage);
router.post("/send", sendMessage);

export default router;
