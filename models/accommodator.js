import mongoose from "mongoose";

const accommodatorSchema = mongoose.Schema({
  // id: { type: String },
  expireAt: {type: Date, default: Date.now, expires: 300},
  email: { type: String, required: true },
  businessName: { type: String, required: true },
  password: { type: String, required: true },
  owner: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  category: { type: String, required: true },
  review: [{ type: Number, }],
  image: { type: String, required: true },
  fetured: Boolean,
  verified: { type: Boolean, default: false, required: true },
  verifiedEmail: { type: Boolean, default: false, required: true },
});

export default mongoose.model("Accommodator", accommodatorSchema);
