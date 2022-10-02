import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
  id: String,
  name: String,
  verified: Boolean,
  birthday: Date,
  birthday: Date,
});

var Client = mongoose.model("Client", clientSchema);
export default Rooms;


  // updatedAt: {
  //   type: Date,
  //   default: new Date(),
  // },
