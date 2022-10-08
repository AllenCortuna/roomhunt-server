import mongoose from "mongoose";

// TODO: image, valid id at business permit ay required
const accommodatorSchema = mongoose.Schema({
  // id: { type: String },
  email: { type: String, required: true },
  businessName: { type: String, required: true },
  password: { type: String, required: true },
  owner: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  category: { type: String, required: true },
  review: [Number],
  fetured: Boolean,
  verfied: { type: Boolean, default: false, required: true },
  image: String,
  validID: String,
  businessPermit: String,
});

export default mongoose.model("Accommodator", accommodatorSchema);
