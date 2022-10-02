
import express from "express";
import { signin, signup } from "../controllers/client.js";

// import auth from "../middleware/auth.js";
const router = express.Router();

// WARNING: add auth for security

router.get("/", getClients);
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
