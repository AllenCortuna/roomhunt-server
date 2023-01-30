import Room from "../../models/room.js";
import Accommodator from "../../models/accommodator.js";

import mongoose from "mongoose";

export const getAccs = async (req, res) => {
  try {
    const { query, verified } = req.query;
    const que = new RegExp(query, "i");
    const result = await Accommodator.find({
      $or: [{ email: que }, { location: que }, { owner: que }],
      verified,
    })
      .select("businessName verified owner location email subcribeTil")
      .sort({ _id: "desc" })
      .limit(20);
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};

export const getAcc = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Accommodator.findById(id).select(
      "businessName verified owner location subcribeTil email"
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteAcc = async (req, res) => {
  try {
    const { id } = req.params;
    await Room.deleteMany({ owner: id });
    await Accommodator.findByIdAndDelete(id);
    res.json({ message: "Accommodator deleted successfully." });
  } catch (err) {
    console.log(err.message);
  }
};

export const verifyAcc = async (req, res) => {
  try {
    const { id } = req.params;
    const { verified } = req.body;
    const result = await Accommodator.findByIdAndUpdate(
      id,
      { verified },
      { new: true }
    ).select("businessName verified owner location email subcribeTil");
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};

export const subcribe = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No Acc with id: ${id}`);
    }
    const date = new Date();
    const result = await Accommodator.findById(id).select(
      "businessName verified owner location email subcribeTil"
    );
    result.subcribe = new Date(`${date.getFullYear()}-${date.getMonth() + 1}`);
    await result.save();
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};
