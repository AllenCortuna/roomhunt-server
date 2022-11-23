import express from "express";
import { deleteMessage, getRecieve, getSend, sendMessage } from "../controllers/message.js";
// import { auth } from "../middleware/auth.js";

const router = express.Router();
// warn: add auth for security
router.post("/send",  sendMessage);
router.get("/getRecieve/:id",  getRecieve);
router.get("/getSend/:id",  getSend);
router.delete("/delete/:id", deleteMessage);

export default router;
