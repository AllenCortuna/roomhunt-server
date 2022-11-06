import express from "express";
import {
  getRooms,
  getOwnRooms,
  getRoomBySearch,
  uploadRoom,
  getRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/room.js";
import { reviewRoom, getReviews } from "../controllers/review.js";

import auth from "../middleware/auth.js";
const router = express.Router();

// WARNING: add auth for security

router.get("/", getRooms);
router.get("/search", getRoomBySearch);
router.post("/", auth, uploadRoom);
// router.post("/review", auth, reviewRoom);
router.get("/review/:id", getReviews);
router.post("/review", reviewRoom);
router.get("/own/:id", getOwnRooms);
router.get("/:id", getRoom);
router.patch("/:id", auth, updateRoom);
router.delete("/:id", auth, deleteRoom);

export default router;
