
import express from "express";
import { login, signup } from "../controllers/client.js";

// import auth from "../middleware/auth.js";
const router = express.Router();


// router.get("/", getClients);
router.post("/signup", signup);
router.get("/login", login);


export default router;
