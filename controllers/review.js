import express from "express";
import mongoose from "mongoose";
import Room from "../models/room.js";
import Review from "../models/review.js";
// import Client from "../models/client.js";

const router = express.Router();

export const reviewRoom = async (req, res) => {
  const { room, senderId, review } = req.body;

  if (!mongoose.Types.ObjectId.isValid(room))
    return res.status(404).send(`No room with id: ${room}`);

  const reviewed = await Review.findOne({
    room: room,
    senderId: senderId,
  });
  console.log("reviewed:",reviewed)
  // WARN: REVIEWED
  if (reviewed) {
    console.log("ALREADY ");
    await reviewed.update({ room, senderId, review });
    await reviewed.save();
    const total = await Review.countDocuments({
      room: room,
    });
    const roomReview = await Review.find({
      room: room,
    })
    const sum = roomReview.map((a) => a.review);
    console.log("sum", sum);
    console.log("total", sum.length);
    function calculateAverage(arr) {
      var total = 0;
      var count = 0;
      arr.forEach(function (item, index) {
        total += item;
        count++;
      });
      return total / count;
    }
    const mean = calculateAverage(sum);
    console.log("mean:",mean)
    const result = await Room.findOneAndUpdate(room, {
      review: mean,
      total: total,
    });
    res.status(201).json({ result });
  } else {
    
    console.log("NOT ALREADY ")
    await new Review({
      room,
      senderId,
      review,
    }).save();
    const total = await Review.countDocuments({
      room: room,
    });
    const roomReview = await Review.find({
      room: room,
    })
    const sum = roomReview.map((a) => a.review);
    console.log("roomReview", sum);

    function calculateAverage(arr) {
      var total = 0;
      var count = 0;
      arr.forEach(function (item, index) {
        total += item;
        count++;
      });
      return total / count;
    }
    const mean = calculateAverage(sum);
    console.log("mean:",mean)
    const result = await Room.findOneAndUpdate(room, {
      review: mean,
      total: total,
    });
    res.status(201).json({ result });
  }
};

export default router;
