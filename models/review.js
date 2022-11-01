import mongoose from "mongoose";

const expendSchema = mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  review: {
    type: Number,
    min: 1,
    max: 5,
    validate: { validate: Number.isInteger },
  },
  updatedAt: { type: Date, default: new Date() },
});

var Room = mongoose.model("Room", expendSchema);
export default Room;
