
import express from "express";
import {
  getRooms,
  getOwnRooms,
  uploadRoom,
  getRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/room.js";

import auth from "../middleware/auth.js";
const router = express.Router();

// WARNING: add auth for security

router.get("/", getRooms);
router.post("/", auth, uploadRoom);
router.get("/:id", getOwnRooms);
router.get("/:id", auth, getRoom);
router.patch("/:id", auth, updateRoom);
router.delete("/:id", auth, deleteRoom);

export default router;
