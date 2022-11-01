import express from "express";
import mongoose from "mongoose";
import Room from "../models/room.js";
import Review from "../models/review.js";
// import Client from "../models/client.js";

const router = express.Router();

export const reviewRoom = async (req, res) => {
  const { room, senderId, review } = req.body;
  console.log(req.body);

  if (!mongoose.Types.ObjectId.isValid(room))
    return res.status(404).send(`No room with id: ${room}`);

  const reviewed = await Review.findOne({
    senderId: senderId,
    room: room,
  });
  // WARN: REVIEWED
  if (reviewed) {
    await reviewed.update({ room, senderId, review });
    await review.save();
    const total = await Review.countDocuments({
      senderId: senderId,
      room: room,
    });
    const roomReview = await Review.find({
      room: room,
    }).map((a) => a.review);
    console.log("roomReview", roomReview);

    function calculateAverage(arr) {
      var total = 0;
      var count = 0;
      arr.forEach(function (item, index) {
        total += item;
        count++;
      });
      return total / count;
    }
    const mean = calculateAverage(roomReview);
    const result = await Room.findOneAndUpdate(id, {
      ...others,
      review: mean,
      total: total,
    });
    res.json(result);
  } else {
    await new Review({
      room,
      senderId,
      review,
    }).save();
    const total = await Review.countDocuments({
      senderId: senderId,
      room: room,
    });
    const roomReview = await Review.find({
      room: room,
    }).map((a) => a.review);
    console.log("roomReview", roomReview);

    function calculateAverage(arr) {
      var total = 0;
      var count = 0;
      arr.forEach(function (item, index) {
        total += item;
        count++;
      });
      return total / count;
    }
    const mean = calculateAverage(roomReview);
    const result = await Room.findOneAndUpdate(id, {
      ...others,
      review: mean,
      total: total,
    });
    res.json(result);
  }
};

export default router;
