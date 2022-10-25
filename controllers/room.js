import express from "express";
import mongoose from "mongoose";
import Room from "../models/room.js";
import Accommodator from "../models/accommodator.js";

const router = express.Router();

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const uploadRoom = async (req, res) => {
  // const { price, name, checkInDate, checkOutDate, image } = req.body;
  const room = req.body;
  const owner = await Accommodator.findById(req.userId);
  const newRoomPost = new Room({
    ...room,
    owner: req.userId,
    updatedAt: new Date(),
    ownerName: owner.businessName,
    category: owner.category,
    location: owner.location,
    updatedAt: new Date().toISOString(),
  });

  try {
    await newRoomPost.save();
    res.status(201).json(newRoomPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateRoom = async (req, res) => {
  const id = req.params;
  // const  room  = req.body;
  const { price, name, checkInDate, checkOutDate, image } = req.body;
  const owner = await Accommodator.findById(req.userId);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No room with id: ${id}`);

  const updatedRoom = {
    _id: id,
    price,
    name,
    checkInDate,
    checkOutDate,
    image,
    owner: req.userId,
    ownerName: owner.businessName,
    category: owner.category,
    location: owner.location,
    updatedAt: new Date().toISOString(),
  };

  await Room.findByIdAndUpdate(id, updatedRoom, { new: true });

  res.json(updatedRoom);
};

export const getRoomBySearch = async (req, res) => {
  const { location, type, bed, aircon, checkInDate, checkOutDate } = req.query;
  try {
    const loc = new RegExp(location, "i");
    const rooms = await Room.find({
      $or: [{ loc }],
      aircon: aircon,
      type: type,
      bed: bed,
      $and: [
        {
          checkInDate: { $lte: checkInDate },
          checkOutDate: { $gte: checkOutDate },
        },
      ],
    }).exec();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOwnRooms = async (req, res) => {
  const { id } = req.params;
  try {
    const rooms = await Room.find({ owner: id });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRoom = async (req, res) => {
  const id = req.params;

  try {
    const room = await Room.findById(id);
    res.status(200).json(room);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  console.log("deleted")
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No room with id: ${id}`);
    await Room.findByIdAndRemove(id);

    res.json({ message: "Room deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default router;
