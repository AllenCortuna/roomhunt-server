import express from "express";
import auth from "../middleware/auth.js";
import { getAccommodation, getAccommodations, getOwnAccommodation,   } from '../controllers/accommodation.js'

const router = express.Router();

// TODO: code all the routes

router.get("/", getAccommodations);
router.get("/:id", getAccommodation);
router.get("/:id", auth, getOwnAccommodation);
// router.post("/", auth, uploadAccommodation);
// router.patch("/:id", auth, updateAccommodation);
// router.delete("/:id", auth, deleteAccommodation);

export default router;
