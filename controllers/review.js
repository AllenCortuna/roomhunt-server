import express from "express";
import mongoose from "mongoose";
import Room from "../models/room.js";
import Review from "../models/review.js";
// import Client from "../models/client.js";

const router = express.Router();

export const getReviews = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No room with id: ${id}`);
    }
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No room with id: ${id}`);
    const result = await Review.find({ room: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

export const reviewRoom = async (req, res) => {
  try {
    const { room, senderId, review, comment, senderName } = req.body;
    if (!review) {
      return res.status(404).send("No Review");
    }
    if (!senderId) {
      return res.status(404).send("Pls Regiter/Login first to Send Review");
    }

    if (!mongoose.Types.ObjectId.isValid(room))
      return res.status(404).send(`No room with id: ${room}`);

    const reviewed = await Review.findOne({
      room: room,
      senderId: senderId,
    });

    function calculateAverage(arr) {
      var total = 0;
      var count = 0;
      arr.forEach(function (item, index) {
        total += item;
        count++;
      });
      return total / count;
    }
    // WARN: REVIEWED
    if (reviewed) {
      await reviewed.updateOne({ room, senderId, review, comment, senderName });
      await reviewed.save();
      const total = await Review.countDocuments({
        room: room,
      });
      const roomReview = await Review.find({
        room: room,
      });
      const sum = roomReview.map((a) => a.review);
      const mean = calculateAverage(sum);
      const patch = await Room.findByIdAndUpdate(room, {
        review: mean,
        total: total,
      });
      patch.save();
      const result = await Room.findById(room);
      res.status(200).json(result);
    } else {
      await new Review({
        room,
        senderId,
        review,
        comment,
        senderName,
      }).save();
      const total = await Review.countDocuments({
        room: room,
      });
      const roomReview = await Review.find({
        room: room,
      });
      const sum = roomReview.map((a) => a.review);

      const mean = calculateAverage(sum);
      const patch = await Room.findByIdAndUpdate(room, {
        review: mean,
        total: total,
      });
      patch.save();

      const result = await Room.findById(room);
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default router;
