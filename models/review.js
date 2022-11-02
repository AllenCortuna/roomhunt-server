import mongoose from "mongoose";

const expendSchema = mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  review: {
    type: Number,
    min: 1,
    max: 5,
  },
  updatedAt: { type: Date, default: new Date() },
});

var Review = mongoose.model("Review", expendSchema);
export default Review;
