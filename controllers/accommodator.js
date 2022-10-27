import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import nodemailer from 'nodemailer'
import { generateOTP, mailTransport, mailVerified } from "../tools/mail.js";
import mongoose from "mongoose";
import Accommodator from "../models/accommodator.js";
import VerificationToken from "../models/verificationTokenAcc.js";
import AccVerify from "../models/accVerify.js";

import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET;

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
    if (oldAccommodator)
      return res.status(400).json({ message: "Accommodator already exist" });

    const hashedPassword = await bcrypt.hash(password, 12);
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
    });

    // generate otp
    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
      owner: newAcc._id,
      token: OTP,
    });

    await verificationToken.save();
    const result = await newAcc.save();

    mailTransport({ OTP, result });
    // auth token
    res.status(201).json({ result });
    console.log(OTP);
  } catch (error) {
    console.log(error);
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
      return res.status(404).json({ message: "Invalid accommodator" });

    const acc = await Accommodator.findById(accommodatorId);
    // kung meron yung account ng accommodator sa database
    if (!acc) return res.status(404).json({ message: "Account not Found" });
    // kung verified na already
    if (acc.verified)
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
      expiresIn: "1w",
    });
    res.status(200).json({ result: acc, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong " });
  }
};

// VERFIY ACCOMMODATORS INFO
export const verifyAcc = async (req, res) => {
  const { owner, validID, businessPermit } = req.body;
  try {
    const alredySubmit = await AccVerify.findOne({ owner });
    if (!owner || !validID || !businessPermit)
      return res.status(400).json({ message: "Invalid Request no parameters" });
    if (alredySubmit)
      return res.status(403).json({ message: "Already Submitted" });
    const files = new AccVerify({
      owner,
      validID,
      businessPermit,
    });
    await files.save();
    res.status(203).json({ message: "Files submitted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong " });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldAccommodator = await Accommodator.findOne({ email });
    if (!oldAccommodator)
      return res.status(404).json({ message: "Accommodator does not exist " });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      oldAccommodator.password
    );

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid password" });

    const token = jwt.sign(
      { email: oldAccommodator.email, id: oldAccommodator._id },
      SECRET,
      { expiresIn: "1w" }
    );
    console.log("login ok");
    res.status(200).json({ result: oldAccommodator, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong " });
  }
};
