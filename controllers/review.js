import express from "express";
import mongoose from "mongoose";
import Room from "../models/room.js";
import Review from "../models/review.js";
// import Client from "../models/client.js";

const router = express.Router();

export const reviewRoom = async (req, res) => {
  const { id } = req.params;
  const { review, senderId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No room with id: ${id}`);

  const alreadyReview = await Review.find({ senderId: senderId });

  // WARN: if client already review
  if (alreadyReview) {
    await Review.findOneAndUpdate(alreadyReview._id, {
      senderId: senderId,
      room: id,
      review: review,
      updatedAt: new Date().toISOString(),
    });

    const roomReview = await Review.find({ room: id });
    // const totalReview = obj => roomReview.review(obj).reduce((a, b) => a + b);
    const total = roomReview.length();
    const totalReview = function sum(obj) {
      return Object.review(obj).reduce(
        (sum, key) => sum + parseFloat(obj[key] || 0),
        0
      );
    };
    const result = await Room.findOneAndUpdate(id, {
      review: totalReview / total,
      total: total,
      updatedAt: new Date().toISOString(),
    });
    res.json(result);
  }
};

export default router;
