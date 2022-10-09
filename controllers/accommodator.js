import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOTP, mailTransport } from "../tools/mail.js";
import mongoose from "mongoose";
import Accommodator from "../models/accommodator.js";
import VerificationToken from "../models/verificationTokenAcc.js";
import AccVerify from "../models/accVerify.js";
const secret = "test";

export const signup = async (req, res) => {
  const { email, businessName, password, owner, location, contact, category } =
    req.body;

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
    });

    // generate otp
    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
      owner: newAcc._id,
      token: OTP,
    });

    await verificationToken.save();
    const result = await newAcc.save();

    // send email with the otp
    mailTransport().sendMail({
      from: "roomhunt@email.com",
      to: newAcc.email,
      subject: "verify your email",
      html: `<h1>${OTP}</h1>`,
    });

    // auth token
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1w",
    });
    res.status(201).json({ result, token });
    // console.log(OTP);
    console.log(result);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " });
    console.log(error);
  }
};

// VERIFIFY EMAIL
export const verifyEmail = async (req, res) => {
  const { otp, accommodatorId } = req.body;
  //check if the valid params
  if (!accommodatorId || !otp.trim())
    return res.status(400).json({ message: "Invalid Request no parameters" });
  // check if tama yung id ng accommodator
  if (!mongoose.isValidObjectId(accommodatorId))
    return res.status(404).json({ message: "Invalid accommodator" });

  const acc = await Accommodator.findById(accommodatorId);
  // kung meron yung account ng accommodator sa database
  if (!acc) return res.status(404).json({ message: "Accommodator not Found" });
  // kung verified na already
  if (acc.verified)
    return res.status(403).json({ message: "Account already verified" });
  const token = await VerificationToken.findOne({ owner: acc._id });
  console.log(token);
  if (!token) return res.status(404).json({ message: "Token not found" });
  const isMatch = await token.compareToken(otp);
  if (!isMatch) return res.status(500).json({ message: "OTP not match" });
  acc.verfiedEmail = true;
  await VerificationToken.findOneAndDelete(token._id);
  await acc.save();

  mailTransport().sendMail({
    from: "roomhunt@email.com",
    to: acc.email,
    subject: "Email verified succesfully",
    html: "<h1>You can now upload and manange your Rooms</h1>",
  });

  res.status(201).json({ message: "Account verified!", acc });
  console.log("sucess verification");
};

// VERFIY ACCOMMODATORS INFO
export const verifyAcc = async (req, res) => {
  const { owner, validID, businessPermit } = req.body;
  try {
    const alredySubmit = await AccVerify.findOne({ owner });
    if (!owner || !validID || !businessPermit)
      return res.status(400).json({ message: "Invalid Requestno parameters" });
    if (alredySubmit)
      return res.status(403).json({ message: "already submitted" });
    const files = new AccVerify({
      owner,
      validID,
      businessPermit,
    })
    await files.save()
    res.status(203).json({message:"Files submitted"})
  } catch (err) {
    console.log(err);
  }
};

// LOGIN
export const signin = async (req, res) => {
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
      secret,
      { expiresIn: "1w" }
    );
    console.log("login ok");
    res.status(200).json({ result: oldAccommodator, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong " });
  }
};
