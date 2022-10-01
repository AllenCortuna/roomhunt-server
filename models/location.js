import mongoose from "mongoose";

const  locationSchema = mongoose.Schema({
  Name : String ,
  owner: String,
  location : String,
  contact: String,
  email: String,
  category: String,
  review: Number,
  fetured: Boolean,
})

const Location = mongoose.model("Location", locationSchema);

export default Location
