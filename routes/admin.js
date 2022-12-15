import express from "express";
import { getAccs, verifyAcc } from "../controllers/admin/acc.js";
import { login } from "../controllers/admin/admin.js";
import { getClients, verifyClient } from "../controllers/admin/client.js";

const router = express.Router();


router.post("/login", login);
router.get("/getAccs", getAccs)
router.patch("/verifyAcc/:id", verifyAcc)
router.get("/getClients", getClients)
router.patch("/verifyClient/:id", verifyClient)





export default router;
