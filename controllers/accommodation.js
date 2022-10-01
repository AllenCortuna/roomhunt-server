import Accomodation from "../models/accommodation.js";
// import mongoose from "mongoose";

export const getAccomodations = async (req, res) => {
  try {
    const accomodation = await Accomodation.find();
    res.status("200").json(accomodation);
  } catch (err) {
    console.log(err.message);
  }
};

export const getAccomodation = async (req, res) => {
  try {
    const { id } = req.params;
    const accomodation = await Accomodation.findOne(id);
    res.status("200").json(accomodation);
  } catch (err) {
    console.log(err.message);
  }
};

export const getOwnAccomodation = async (req, res) => {
  try {
    const { id } = req.params;
    const accomodation = await Accomodation.find({ _id: id });
    res.status("200").json(accomodation);
  } catch (err) {
    console.log(err.message);
  }
};

// export const deleteAccomodation = async (req, res) => {
//   try {
//     const {id} = req.params
//     if (!mongoose.Types.ObjectId.isValid(id))
//       return ()
//   } catch (err) {
//     console.log(err.message) 
//   }
// }



