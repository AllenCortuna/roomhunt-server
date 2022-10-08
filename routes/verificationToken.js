import express from "express";
import {} from "../controllers/room.js";

// import auth from "../middleware/auth.js";
const router = express.Router();

// WARNING: add auth for security  from middleware

router.get("/verify-email", getRooms);

export default router;
