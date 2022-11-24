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

export const setRoomView = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    await room.update({ view: this.room.view + 1 });
    res.status(200);
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
  try {
    const { id } = req.params;
    // const  room  = req.body;
    const { price, name, bed, description, category, image,location } = req.body;
    const owner = await Accommodator.findById(req.userId);

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: `No room with id: ${id}` });

    const updatedRoom = {
      _id: id,
      ownerName: owner.businessName,
      name,
      price,
      bed,
      image,
      category,
      location,
      description,
      unavailableUntil,
      owner: req.userId,
      updatedAt: new Date().toISOString(),
    };

    await Room.findByIdAndUpdate(id, updatedRoom, { new: true });

    res.json(updatedRoom);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRoomByLocation = async (req, res) => {
  try {
    const { location, category } = req.query;
    const loc = new RegExp(location, "i");
    const rooms = await Room.find({
      location: loc,
      category: category,
    }).limit(12);
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRoomBySearch = async (req, res) => {
  const {
    category,
    location,
    bed,
    checkInDate,
    checkOutDate,
    minPrice,
    maxPrice,
  } = req.query;
  try {
    const loc = new RegExp(location, "i");
    const rooms = await Room.find({
      location: loc,
      category: category,
      bed: bed,
      price: { $gte: minPrice, $lte: maxPrice },
      $or: [
        {
          checkInDate: { $gte: checkInDate, $gte: checkOutDate },
          checkOutDate: { $gte: checkInDate, $gte: checkOutDate },
        },
        {
          checkInDate: { $lte: checkInDate, $lte: checkOutDate },
          checkOutDate: { $lte: checkInDate, $lte: checkOutDate },
        },
      ],
    });
    res.status(200).json(rooms);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
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
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    res.status(200).json(room);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
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
