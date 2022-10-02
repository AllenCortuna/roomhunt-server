import mongoose from "mongoose";

const accommodatorSchema = mongoose.Schema({
  id: { type: String },
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  Name: String,
  owner: String,
  location: String,
  contact: String,
  email: String,
  category: String,
  review: [Number],
  fetured: Boolean,
  verfied: Boolean,
  image: String,
  validId: String,
  BusinessPermit: String,
});

export default mongoose.model("Accommodator", accommodatorSchema);
