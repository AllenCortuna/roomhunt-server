import Client from "../../models/client.js";

export const getClients = async (req, res) => {
  try {
    const { query, verified } = req.query;
    const que = new RegExp(query, "i");
    const result = await Client.find({
      $or: [{ email: que },{ name: que }],
      verified,
    })
      .sort({ _id: "desc" })
      .limit(20);
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};

export const verifyClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { verified } = req.body;
    console.log(verified);
    const result = await Client.findByIdAndUpdate(
      id,
      { verified },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};
