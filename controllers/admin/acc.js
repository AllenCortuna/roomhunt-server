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
      .select("businessName verified owner location email")
      .sort({ _id: "desc" })
      .limit(20);
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};

export const verifyAcc = async (req, res) => {
  try {
    const { id } = req.params;
    const { verified } = req.body;
    console.log(verified);
    const result = await Accommodator.findByIdAndUpdate(
      id,
      { verified },
      { new: true }
    ).select("businessName verified owner location email");
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
    let day = date.getDate();
    let month = date.getMonth() + 1 > 12 ? 1 : date.getMonth() + 1;
    let year = date.getMonth() + 1 > 12 ? date.getFullYear() : date.getFullYear() + 1;

    const now = new Date(`${year}-${month}-${day}`);
    const result = await Accommodator.findByIdAndUpdate(
      id,
      { subcribeTil: now },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};
