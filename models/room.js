import mongoose from "mongoose";

const expendSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodator",
    required: true,
  },
  ownerName: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, default: "None" },
  location: { type: String, required: true },
  name: { type: String, default: "None" },
  price: { type: Number, required: true },
  bed: { type: String, required: true },
  view: { type: Number, default: 0 },
  review: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  image: { type: String, required: true },
  unavailableUntil: { type: Date, default: null },
  updatedAt: { type: Date, default: new Date() },
  // checkInDate: { type: Date, default: null },
});

var Room = mongoose.model("Room", expendSchema);
export default Room;
