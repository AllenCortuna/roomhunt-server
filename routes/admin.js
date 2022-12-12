
import express from "express";
import { getAccs, verifyAcc } from "../controllers/admin/acc.js";
import { login } from "../controllers/admin/admin.js";

const router = express.Router();


router.post("/login", login);
router.get("/getAccs", getAccs)
router.patch("/verify", verifyAcc)





export default router;
