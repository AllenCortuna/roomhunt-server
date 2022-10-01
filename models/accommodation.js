import mongoose from "mongoose";

const  accommodationSchema = mongoose.Schema({
  Name : String ,
  owner: String,
  location : String,
  contact: String,
  email: String,
  category: String,
  review: [Number],
  fetured: Boolean,
  verfied: Boolean,
})

const Accommodation = mongoose.model("Accommodation", accommodationSchema);

export default Accommodation
