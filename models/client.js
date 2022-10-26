import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, required: true },
  birthday: { type: Date, required: true },
  verified: { type: Boolean, default: false },
  expireAt: { type: Date, default: Date.now, expires: 300 },
});

var Client = mongoose.model("Client", clientSchema);
export default Client;

