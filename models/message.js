import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  recieverId: {
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

var Message = mongoose.model("Message", messageSchema);
export default Message;
