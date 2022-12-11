import express from "express";
import {
  getRooms,
  getOwnRooms,
  getRoomBySearch,
  uploadRoom,
  getRoom,
  updateRoom,
  deleteRoom,
  getRoomByLocation,
  updateView,
  // getFeaturedRooms,
} from "../controllers/room.js";
import { reviewRoom, getReviews } from "../controllers/review.js";

import auth from "../middleware/auth.js";
const router = express.Router();

// WARNING: add auth for security

router.get("/", getRooms);
// router.get("/getFeatured", getFeaturedRooms);
router.get("/search", getRoomBySearch);
router.get("/location", getRoomByLocation);
router.get("/review/:id", getReviews);
router.patch("/view/:id", updateView);
router.get("/own/:id", getOwnRooms);
router.get("/:id", getRoom);
router.post("/", auth, uploadRoom);
router.post("/review", auth, reviewRoom);
router.patch("/:id", auth, updateRoom);
router.delete("/:id", auth, deleteRoom);

export default router;
