import express from "express";
import { getAcc, getAccs, subcribe, verifyAcc } from "../controllers/admin/acc.js";
import { login } from "../controllers/admin/admin.js";
import { getClients, verifyClient } from "../controllers/admin/client.js";

const router = express.Router();


router.post("/login", login);
router.get("/getAccs", getAccs)
router.get("/getAcc/:id", getAcc)
router.patch("/verifyAcc/:id", verifyAcc)
router.get("/getClients", getClients)
router.patch("/verifyClient/:id", verifyClient)
router.patch("/subcribe/:id", subcribe)





export default router;
