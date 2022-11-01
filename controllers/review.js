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

  const alreadyReview = await Review.find({
    senderId: senderId,
  });

  // WARN: if client already review
  if (alreadyReview) {
    await Review.findOneAndUpdate(alreadyReview._id, {
      senderId: senderId,
      room: room,
      review: review,
      updatedAt: new Date().toISOString(),
    });

    const roomReview = await Review.find({
      room: room,
    });
    // const totalReview = obj => roomReview.review(obj).reduce((a, b) => a + b);
    const total = roomReview.length;
    const totalReview = roomReview
      .map((rev) => rev.review)
      .reduce((accumulator, value) => {
        return parseInt(accumulator) + parseInt(value);
      }, 0);
    console.log("total", total);
    console.log("totalReview", totalReview);
    const result = await Room.findOneAndUpdate(room, {
      review: totalReview / total,
      total: total,
      updatedAt: new Date().toISOString(),
    });
    res.json(result);
    console.log(result);
  } else {
    const review = new Review({
      room: room,
      senderId: senderId,
      review: review,
    });
    //find review with the same roomID
    const roomReview = await Review.find({
      room: room,
    });
    // const totalReview = obj => roomReview.review(obj).reduce((a, b) => a + b);
    const total = roomReview.length;
    const totalReview = roomReview
      .map((rev) => rev.review)
      .reduce((accumulator, value) => {
        return parseInt(accumulator) + parseInt(value);
      }, 0);
    console.log("total", total);
    console.log("totalReview", totalReview);
    const result = await Room.findOneAndUpdate(id, {
      review: totalReview / total,
      total: total,
      updatedAt: new Date().toISOString(),
    });
    res.json(result);
  }
};

export default router;
