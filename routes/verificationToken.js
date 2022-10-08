

import express from "express";
import {
} from "../controllers/room.js";

// import auth from "../middleware/auth.js";
const router = express.Router();

// WARNING: add auth for security  from middleware 

router.get("/verify-token", getRooms);

export default router;
