import express from "express";
import mongoose from "mongoose";
import Room from "../models/room.js";
import Accommodator from "../models/accommodator.js";

const router = express.Router();

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().slice("image", 1);
    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFeaturedRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ featured: true });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateView = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    const view = room.view + 1;
    await Room.findByIdAndUpdate(id, { view: view }, { new: true });
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const uploadRoom = async (req, res) => {
  const room = req.body;
  const owner = await Accommodator.findById(req.userId);
  const newRoomPost = new Room({
    ...room,
    owner: req.userId,
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
    const {
      price,
      name,
      bed,
      description,
      category,
      image,
      location,
      unavailableUntil,
    } = req.body;
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
    })
      .slice("image", 1)
      .limit(12);
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRoomBySearch = async (req, res) => {
  const { category, location, bed, checkInDate, minPrice, maxPrice } =
    req.query;
  try {
    const loc = new RegExp(location, "i");
    const cat = new RegExp(category, "i");
    const count = new RegExp(bed, "i");

    const min_Price = minPrice ? minPrice : 0;
    const max_Price = maxPrice ? maxPrice : 10000;
    const check_InDate = checkInDate
      ? checkInDate
      : new Date().setFullYear(2030);
    const rooms = await Room.find({
      location: loc,
      category: cat,
      bed: count,
      price: { $gte: min_Price, $lte: max_Price },
      $or: [
        { unavailableUntil: { $lt: check_InDate } },
        { unavailableUntil: null },
      ],
    }).slice("image", 1);

    res.status(200).json(rooms);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getOwnRooms = async (req, res) => {
  const { id } = req.params;
  try {
    const rooms = await Room.find({ owner: id }).slice("image", 1);
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
