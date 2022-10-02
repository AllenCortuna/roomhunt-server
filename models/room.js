import mongoose from "mongoose";

const expendSchema = mongoose.Schema({
  name: {type:String, default:"None"},
  price: { type: String, required: true },
  description: String,
  availableDate: [String],
  image: [String],
  tags: [String],
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

var Rooms = mongoose.model("Rooms", expendSchema);
export default Rooms;
