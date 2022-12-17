import mongoose from "mongoose";

const accommodatorSchema = mongoose.Schema({
  expireAt: { type: Date, default: Date.now, expires: 300 },
  email: { type: String, required: true },
  businessName: { type: String, required: true },
  password: { type: String, required: true },
  owner: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  category: { type: String, required: true },
  review: [{ type: Number }],
  image: { type: String, required: true },
  featured: { type: Boolean, default: false },
  subcribeTil: { type: Date, default: Date.now(), required: true },
  verified: { type: Boolean, default: true, required: true },
  verifiedEmail: { type: Boolean, default: false, required: true },
});

export default mongoose.model("Accommodator", accommodatorSchema);
