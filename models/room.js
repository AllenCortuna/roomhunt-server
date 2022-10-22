import mongoose from "mongoose";

const expendSchema = mongoose.Schema({
  owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodator",
    required: true,  
  },
  ownerName: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  updatedAt: { type: Date, default: new Date() },
  name: { type: String, default: "None" },
  price: { type: String, required: true },
  bed: { type: String, required: true },
  image: { type: String, required: true },
  // date
  checkInDate:{ type: Date, default: null },
  checkOutDate:{ type: Date, default: null },
  // aircon: { type: Boolean, required: true },
});

var Room = mongoose.model("Room", expendSchema);
export default Room;
