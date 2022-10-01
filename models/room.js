import mongoose from "mongoose";

const expendSchema = mongoose.Schema({
  name: String,
  price: Number,
  details: String,
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

var Rooms = mongoose.model("Rooms", expendSchema);
export default Rooms;
