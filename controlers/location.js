import Location from "../models/location.js";
import mongoose from "mongoose";

export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status("200").json(locations);
  } catch (err) {
    console.log(err.message);
  }
};

export const getLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const locations = await Location.findOne(id);
    res.status("200").json(locations);
  } catch (err) {
    console.log(err.message);
  }
};

export const getOwnLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const locations = await Location.find({ _id: id });
    res.status("200").json(locations);
  } catch (err) {
    console.log(err.message);
  }
};

// export const deleteLocation = async (req, res) => {
//   try {
//     const {id} = req.params
//     if (!mongoose.Types.ObjectId.isValid(id))
//       return ()
//   } catch (err) {
//     console.log(err.message) 
//   }
// }



