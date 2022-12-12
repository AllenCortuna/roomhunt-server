import Accommodator from "../../models/accommodator.js";

export const getAccs = async (req, res) => {
  try {
    const { query, verified } = req.query;
    console.log(verified, query);

    const que = new RegExp(query, "i");
    const result = await Accommodator.find({
      $or: [{ email: que }],
      verified,
    }).sort({ _id: -1 });
    res.status(200).json(result);
    // .project({ email: 1, location: 1, owner: 1, businessName: 1 });
  } catch (err) {
    console.log(err.message);
  }
};

export const verifyAcc = async (req, res) => {
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
