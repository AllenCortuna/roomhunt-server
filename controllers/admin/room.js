import Room from "../../models/room.js";

export const getRooms = async (req, res) => {
  try {
    const result = await Room.find();
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};

export const getRoomsBySearch = async (req, res) => {
  try {
    const { query } = req.body;
    const que = new RegExp(query, "i");
    const result = await Room.find({ $or: [{ location: que },{owner: que},{ownerName: que}] });
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};


export const setFeaturedRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Room.findByIdAndUpdate(
      id,
      { featured: 2628002 },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};
