// import nodemailer from 'nodemailer'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOTP, mailTransport, mailVerified } from "../tools/mail.js";
import mongoose from "mongoose";
import Accommodator from "../models/accommodator.js";
import VerificationToken from "../models/verificationTokenAcc.js";

import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET;
const SALT = process.env.SALT;

export const getAcc = async (req, res) => {
  try {
    const { id } = req.params;
    const acc = await Accommodator.findById(id);
    if (!acc) {
      return res.status(404).json({ message: "Accommodator does not exist" });
    }
    res.status(200).json(acc);
  } catch (error) {
    res.status(500).json({ message: `Something went wrong${error.message}` });
  }
};

export const getFeaturedAcc = async (req, res) => {
  try {
    const acc = await Accommodator.find({ featured: true });
    res.status(200).json(acc);
  } catch (error) {
    res.status(500).json({ message: `Something went wrong${error.message}` });
  }
};

export const patchAcc = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      businessName,
      ownerName,
      location,
      contact,
      email,
      image,
      category,
    } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: `Not a valid Id: ${id}` });
    const acc = await Accommodator.findByIdAndUpdate(
      id,
      {
        businessName,
        ownerName,
        location,
        email,
        contact,
        image,
        category,
      },
      { new: true }
    );
    const token = jwt.sign({ email: acc.email, id: acc._id }, SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ result: acc, token });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong${err.message}` });
    console.log(err.message);
  }
};

export const signup = async (req, res) => {
  const {
    email,
    businessName,
    password,
    owner,
    location,
    contact,
    category,
    image,
  } = req.body;

  try {
    const oldAccommodator = await Accommodator.findOne({ email });
    if (oldAccommodator) {
      return res.status(409).json({ message: "Account already exist" });
    }

    // free one month subcriptions
    const date = new Date();
    const ndate = new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000);
    const free = `${ndate.getFullYear()}-${("0" + (ndate.getMonth() + 1)).slice( -2)}-${("0" + ndate.getDate()).slice(-2)}`;

    const hashedPassword = await bcrypt.hash(password, parseInt(SALT));
    // save new accomodator
    const newAcc = new Accommodator({
      email,
      businessName,
      password: hashedPassword,
      owner,
      location,
      contact,
      category,
      image,
      subcribeTil: free,
    });

    // generate otp
    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
      owner: newAcc._id,
      token: OTP,
    });

    await verificationToken.save();
    await newAcc.save();
    const result = await Accommodator.findById(newAcc._id).select(
      "email password owner location"
    );

    mailTransport({ OTP, result });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong${error.message}` });
  }
};

// VERIFIFY EMAIL
export const verifyEmail = async (req, res) => {
  try {
    const { otp, accommodatorId } = req.body;
    //check if the valid params
    if (!accommodatorId || !otp.trim())
      return res.status(400).json({ message: "Invalid Request no parameters" });
    // check if tama yung id ng accommodator
    if (!mongoose.isValidObjectId(accommodatorId))
      return res.status(404).json({ message: "Invalid Accommodator Id" });

    const acc = await Accommodator.findById(accommodatorId);
    // kung meron yung account ng accommodator sa database
    if (!acc) return res.status(404).json({ message: "Account not Found" });
    // kung verified na already
    if (acc.verifiedEmail)
      return res.status(403).json({ message: "Account already verified" });
    const verToken = await VerificationToken.findOne({ owner: acc._id });
    if (!verToken) return res.status(404).json({ message: "Token not found" });
    const isMatch = await verToken.compareToken(otp);
    if (!isMatch) return res.status(500).json({ message: "OTP not match" });
    acc.verifiedEmail = true;
    acc.expireAt = null;
    await VerificationToken.findOneAndDelete(verToken._id);
    await acc.save();

    mailVerified(acc.email);
    const token = jwt.sign({ email: acc.email, id: acc._id }, SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ result: acc, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong " });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldAccommodator = await Accommodator.findOne({ email });
    if (!oldAccommodator) {
      return res.status(401).json({ message: "Account does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      oldAccommodator.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { email: oldAccommodator.email, id: oldAccommodator._id },
      SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ result: oldAccommodator, token });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong ${err} ` });
  }
};
