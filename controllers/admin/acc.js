import Accommodator from "../../models/accommodator.js";

export const getAccs = async (req, res) => {
  try {
    const result = await Accommodator.find();
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};

export const getAccsBySearch = async (req, res) => {
  try {
    const { query } = req.body;
    const que = new RegExp(query, "i");
    const result = await Accommodator.find({ $or: { email: que } });
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};


export const verfiedAcc = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Accommodator.findByIdAndUpdate(
      id,
      { verified: true },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};
