import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
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

var Room = mongoose.model("Message", messageSchema);
export default Room;
