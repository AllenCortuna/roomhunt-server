import Message from "../models/message.js";

export const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(senderId))
      return res.status(404).send({ message: `Not a valid Id: ${senderId}` });
    const result = Message.find({ recieverId: id });
    res.status(201).json({ result });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong${err.message}` });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { message, senderId, recieverId, sender, reciever } = req.body;
    const send = new Message({
      senderId,
      recieverId,
      reciever,
      sender,
      message,
    });
    // check id
    if (!mongoose.Types.ObjectId.isValid(senderId))
      return res.status(404).send({ message: `Not a valid Id: ${senderId}` });
    if (!mongoose.Types.ObjectId.isValid(recieverId))
      return res.status(404).send({ message: `Not a valid Id: ${recieverId}` });
    // check message
    if (!message) return res.status(400).json({ message: "Message Empty" });
    const result = await send.save();
    res.status(201).json({ result });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong${err.message}` });
  }
};
