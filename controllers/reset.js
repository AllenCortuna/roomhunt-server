import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOTP, mailTransport, mailPassReset } from "../tools/mail.js";
import VerificationToken from "../models/verificationTokenAcc.js";
import mongoose from "mongoose";
import Client from "../models/client.js";
import Accommodator from "../models/accommodator.js";
const SECRET = process.env.SECRET;
const SALT = process.env.SALT;

import dotenv from "dotenv";
dotenv.config();

export const resetClientPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldClient = await Client.findOne({ email });
    if (!oldClient) return res.status(400).json({ message: "Email not found" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      oldClient.password
    );

    if (isPasswordCorrect)
      return res
        .status(404)
        .json({ message: "Password must not be the same as old password" });

    // generate otp
    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
      owner: oldClient._id,
      token: OTP,
    });

    await verificationToken.save();
    const result = await oldClient.save();

    mailTransport({ OTP, result });
    res.status(201).json({ result });
    console.log(OTP);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Something went wrong${error.message}` });
  }
};

// Resey resetClientPasword
export const resetClientPasswordOTP = async (req, res) => {
  try {
    const { otp, password } = req.body;
    const { id } = req.params;
    console.log(id);
    console.log(otp);
    //check if the valid params
    if (!id || !otp.trim() || !password)
      return res.status(400).json({ message: "Invalid Request no parameters" });
    // check if tama yung id
    if (!mongoose.isValidObjectId(id))
      return res.status(404).json({ message: "Invalid Client" });

    const client = await Client.findById(id);
    // kung meron yung account
    if (!client) return res.status(404).json({ message: "Account not Found" });
    // kung verified na already
    const verToken = await VerificationToken.findOne({ owner: client._id });
    if (!verToken) return res.status(404).json({ message: "Token not found" });
    const isMatch = await verToken.compareToken(otp);
    if (!isMatch) return res.status(500).json({ message: "OTP not match" });
    const newPassword = await bcrypt.hash(password, parseInt(SALT));
    client.password = newPassword;
    await client.save();
    await VerificationToken.findOneAndDelete(verToken._id);

    mailPassReset(client.email);
    const token = jwt.sign({ email: client.email, id: client._id }, SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ result: client, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const resetAccPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldAcc = await Accommodator.findOne({ email });
    if (!oldAcc) return res.status(400).json({ message: "Email not found" });

    const isPasswordCorrect = await bcrypt.compare(password, oldAcc.password);

    if (isPasswordCorrect)
      return res
        .status(404)
        .json({ message: "Password must not be the same as old password" });

    // generate otp
    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
      owner: oldAcc._id,
      token: OTP,
    });

    await verificationToken.save();
    const result = await oldAcc.save();

    mailTransport({ OTP, result });
    res.status(201).json({ result });
    console.log(OTP);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Something went wrong${error.message}` });
  }
};

// Resey resetClientPasword
export const resetAccPasswordOTP = async (req, res) => {
  try {
    const { otp, password } = req.body;
    const { id } = req.params;
    console.log(otp);
    console.log(id);
    //check if the valid params
    if (!id || !otp.trim() || !password)
      return res.status(400).json({ message: "Invalid Request no parameters" });
    // check if tama yung id
    if (!mongoose.isValidObjectId(id))
      return res.status(404).json({ message: "Invalid Accommodator" });

    const acc = await Accommodator.findById(id);
    // kung meron yung account
    if (!acc) return res.status(404).json({ message: "Account not Found" });
    // kung verified na already
    const verToken = await VerificationToken.findOne({ owner: acc._id });
    if (!verToken) return res.status(404).json({ message: "Token not found" });
    const isMatch = await verToken.compareToken(otp);
    if (!isMatch) return res.status(500).json({ message: "OTP not match" });
    acc.password = await bcrypt.hash(password, parseInt(SALT));
    await VerificationToken.findOneAndDelete(verToken._id);
    await acc.save();

    mailPassReset(acc.email);
    const token = jwt.sign({ email: acc.email, id: acc._id }, SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ result: acc, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
