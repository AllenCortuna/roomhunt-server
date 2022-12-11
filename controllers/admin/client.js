import Client from "../../models/client.js";

export const getClients = async (req, res) => {
  try {
    const result = await Client.find();
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};

export const getClientsBySearch = async (req, res) => {
  try {
    const { query } = req.body;
    const que = new RegExp(query, "i");
    const result = await Client.find({ $or: { email: que } });
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};


export const verfiedClient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Client.findByIdAndUpdate(
      id,
      { verified: true },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};
