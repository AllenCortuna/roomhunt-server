import Accommodator from "../../models/accommodator.js";

export const getAccs = async (req, res) => {
  try {
    const { query, verified } = req.query;
    const que = new RegExp(query, "i");
    const result = await Accommodator.find({
      $or: [{ email: que }, { location: que }, { owner: que }],
      verified,
    })
      .select("businessName verified owner location email")
      .sort({ _id: "desc" }).limit(20);
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};

export const verifyAcc = async (req, res) => {
  try {
    const { id } = req.params;
    const { verified } = req.body;
   console.log(verified) 
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
