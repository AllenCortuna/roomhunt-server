import Room from "../../models/room.js";
import Accommodator from "../../models/accommodator.js";
import Client from "../../models/client.js";

export const countData = async (req, res) => {
  try {
    const verifiedAcc = await Accommodator.countDocuments();
    const notVerifiedAcc = await Accommodator.countDocuments({ verified: false });
    const verifiedClient = await Client.countDocuments();
    const notVerifiedClient = await Client.countDocuments({ verified: false });
    res.json({
      result: {
        verifiedAcc,
        notVerifiedAcc,
        verifiedClient,
        notVerifiedClient,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const countByCategory = async (req, res) => {
  try {
    const hotel = await Accommodator.countDocuments({ category: "hotel" });
    const resort = await Accommodator.countDocuments({ category: "resort" });
    const dorm = await Accommodator.countDocuments({ category: "dorm" });

    res.json({
      result: {
        hotel,
        dorm,
        resort,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};
