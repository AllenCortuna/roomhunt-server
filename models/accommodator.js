import mongoose from "mongoose";

const accommodatorSchema = mongoose.Schema({
  id: { type: String },
  email: { type: String, required: true },
  businessName: { type: String, required: true },
  password: { type: String, required: true },
  owner: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  category: { type: String, required: true },
  review: [Number],
  fetured: Boolean,
  verfied: {type: Boolean, default: false},
  image: String,
  validID: String,
  businessPermit: String,
});

export default mongoose.model("Accommodator", accommodatorSchema);
