import Message from "../models/message.js";
import mongoose from "mongoose";

export const getRecieve = async (req, res) => {
  console.log("getRecieve");
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: `Not a valid Id: ${id}` });
    const result = await Message.find({ recieverId: id });
    res.status(201).json({ result });
    console.log(result)
  } catch (err) {
    res.status(500).json({ message: `Something went wrong${err.message}` });
    console.log(err.message)
  }
};

export const getSend = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: `Not a valid Id: ${id}` });
    const result = await Message.find({ senderId: id });
    res.status(201).json({ result });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong${err.message}` });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: `Not a valid Id: ${id}` });
    
    await Message.findByIdAndDelete(id);
    res.json({ message: "Message Deleted" });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong${err.message}` });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { message, senderId, recieverId, sender, reciever } = req.body;
    // check id
    if (!mongoose.Types.ObjectId.isValid(senderId))
      return res.status(404).send({ message: `Not a valid Id: ${senderId}` });
    if (!mongoose.Types.ObjectId.isValid(recieverId))
      return res.status(404).send({ message: `Not a valid Id: ${recieverId}` });
    // check message
    if (!message) return res.status(400).json({ message: "Message Empty" });

    const send = new Message({
      senderId,
      recieverId,
      reciever,
      sender,
      message,
    });
    const result = await send.save();
    res.status(201).json({ result });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong${err.message}` });
  }
};
