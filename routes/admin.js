import express from "express";
import { deleteAcc, getAcc, getAccs, subcribe, verifyAcc } from "../controllers/admin/acc.js";
import { login } from "../controllers/admin/admin.js";
import { getClients, verifyClient } from "../controllers/admin/client.js";
import { countByCategory, countData } from "../controllers/admin/dashboard.js";

const router = express.Router();

// admin login
router.post("/login", login);
// admin accommodator routes
router.get("/getAccs", getAccs)
router.get("/getAcc/:id", getAcc)
router.delete("/deleteAcc/:id",deleteAcc)
router.patch("/verifyAcc/:id", verifyAcc)
// admin client routes
router.get("/getClients", getClients)
router.patch("/verifyClient/:id", verifyClient)
router.patch("/subcribe/:id", subcribe)
// admin dashboard
router.get("/countData", countData)
router.get("/countByCategory", countByCategory)






export default router;
