import mongoose from "mongoose";

const expendSchema = mongoose.Schema({
  owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodator",
    required: true,  
  },
  name: { type: String, default: "None" },
  ownerName: { type: String, required: true },
  price: { type: String, required: true },
  description: String,
  image: { type: String, required: true },
  bed: { type: String, required: true },
  aircon: { type: Boolean, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  updatedAt: { type: Date, default: new Date() },
  // date
  checkInDate:{ type: Date, default: null },
  checkOutDate:{ type: Date, default: null },
});

var Room = mongoose.model("Room", expendSchema);
export default Room;
