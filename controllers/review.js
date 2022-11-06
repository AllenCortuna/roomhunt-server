import express from "express";
import mongoose from "mongoose";
import Room from "../models/room.js";
import Review from "../models/review.js";
// import Client from "../models/client.js";

const router = express.Router();

export const getReviews = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const result = await Review.find({ room: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
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
      await Room.findOneAndUpdate(room, {
        review: mean,
        total: total,
      });
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
      await Room.findByIdAndUpdate(room, {
        review: mean,
        total: total,
      });

      const result = await Room.findById(room);
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default router;
