import express from "express";
import auth from "../middleware/auth.js";
import { getLocation, getLocations, getOwnLocation,   } from '../controlers/location.js'

const router = express.Router();

// TODO: code all the routes

router.get("/", getLocations);
router.get("/:id", getLocation);
router.get("/:id", auth, getOwnLocation);
// router.post("/", auth, uploadLocation);
// router.patch("/:id", auth, updateLocation);
// router.delete("/:id", auth, deleteLocation);

export default router;
