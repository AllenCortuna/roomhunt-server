
import express from "express";
import {
  getRooms,
  getOwnRooms,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/room.js";

// import auth from "../middleware/auth.js";
const router = express.Router();

// WARNING: add auth for security

router.get("/", getRooms);
router.get("/", getOwnRooms);
router.post("/", createRoom);
router.get("/:id", getRoom);
router.patch("/:id", updateRoom);
router.delete("/:id", deleteRoom);

export default router;
