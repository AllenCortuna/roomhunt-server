import mongoose from "mongoose";


const expendSchema = mongoose.Schema({
  reciverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  sender: { type: String, required: true },
  reciever: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

var Room = mongoose.model("Room", expendSchema);
export default Room;
