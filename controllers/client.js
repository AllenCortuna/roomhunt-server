import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOTP, mailTransport, mailVerified } from "../tools/mail.js";
import VerificationToken from "../models/verificationTokenAcc.js";
import mongoose from "mongoose";
import Client from "../models/client.js";
const SECRET = process.env.SECRET;
// import AccVerify from "../models/accVerify.js";

import dotenv from "dotenv";
dotenv.config();
export const signup = async (req, res) => {
  
  const { email, password , birthday, name} = req.body;
  try {
    const oldClient = await Client.findOne({ email });
    if (oldClient)
      return res.status(400).json({ message: "Client already exist" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newAcc = new Client({
      name,
      email,
      birthday,
      password: hashedPassword,
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
    const { otp, clientId } = req.body;
    console.log(clientId)
    console.log(otp)
    //check if the valid params
    if (!clientId || !otp.trim())
      return res.status(400).json({ message: "Invalid Request no parameters" });
    // check if tama yung id 
    if (!mongoose.isValidObjectId(clientId))
      return res.status(404).json({ message: "Invalid Client" });

    const client = await Client.findById(clientId);
    // kung meron yung account 
    if (!client) return res.status(404).json({ message: "Account not Found" });
    // kung verified na already
    if (client.verifiedEmail)
      return res.status(403).json({ message: "Account already verified" });
    const verToken = await VerificationToken.findOne({ owner: client._id });
    if (!verToken) return res.status(404).json({ message: "Token not found" });
    const isMatch = await verToken.compareToken(otp);
    if (!isMatch) return res.status(500).json({ message: "OTP not match" });
    client.verifiedEmail = true;
    client.expireAt = null;
    await VerificationToken.findOneAndDelete(verToken._id);
    await client.save();

    mailVerified(client.email);
    const token = jwt.sign({ email: client.email, id: client._id }, SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ result: client, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong " });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldClient = await Client.findOne({ email });
    if (!oldClient)
      return res.status(404).json({ message: "Client does not exist " });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      oldClient.password
    );

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid password" });

    const token = jwt.sign(
      { email: oldClient.email, id: oldClient._id },
      process.env.SECRET,
      { expiresIn: "1d" }
    );
    console.log("login ok");
    res.status(200).json({ result: oldClient, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
