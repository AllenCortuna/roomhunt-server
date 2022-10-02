import express from "express";
import mongoose from "mongoose";
import Rooms from "../models/room.js";

const router = express.Router();


export const getRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find();
    res.status(200).json(rooms);
    console.log("getRooms ok");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const getOwnRooms = async (req, res) => {
  const { myid } = req.params;

  try {
    const rooms = await Rooms.find({ creator: myid });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

 
export const getRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Rooms.findById(id);
    res.status(200).json(room);
  } catch (error) {
    res.status(404).json({ message: error.message });

  }
};

export const createRoom = async (req, res) => {
  const room = req.body;

  const newRoomPost = new Rooms({
    ...room,
    creator: req.userId,
    updatedAt: new Date().toISOString(),
  });

  try {
    await newRoomPost.save();
    res.status(201).json(newRoomPost);
    console.log("create ok");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};



export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { name, price, details } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No room with id: ${id}`);

  const updatedRoom = {
    name,
    price,
    details,
    _id: id,
    updatedAt: new Date().toISOString(),
  };

  await Rooms.findByIdAndUpdate(id, updatedRoom, { new: true });

  res.json(updatedRoom);
};



export const deleteRoom = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No room with id: ${id}`);

  await Rooms.findByIdAndRemove(id);

  res.json({ message: "Room deleted successfully." });
};

export default router;
