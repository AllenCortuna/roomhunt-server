import mongoose from "mongoose";

const accVerify = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodator",
    required: true,
  },
  validID: { type: String, required: true },
  businessPermit: { type: String, required: true },
});

export default mongoose.model("AccVerify", accVerify);
