import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  role: { type: String, required: true, default: "admin" },
  password: { type: String, required: true },
});

export default mongoose.model("Admin", adminSchema);
