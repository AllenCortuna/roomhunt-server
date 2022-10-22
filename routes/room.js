
import express from "express";
import {
  getRooms,
  getOwnRooms,
  uploadRoom,
  getRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/room.js";

// import auth from "../middleware/auth.js";
const router = express.Router();

// WARNING: add auth for security

router.get("/", getRooms);
router.get("/", getOwnRooms);
router.post("/", uploadRoom);
router.get("/:id", getRoom);
router.patch("/:id", updateRoom);
router.delete("/:id", deleteRoom);

export default router;
