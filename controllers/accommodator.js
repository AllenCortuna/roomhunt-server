import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOTP, mailTransport } from "../tools/mail.js";

import Accommodator from "../models/accommodator.js";
import VerificationToken from "../models/verificationToken.js";
const secret = "test";

export const signup = async (req, res) => {
  const { email, password } = req.body;

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
      review,
      fetured,
      verfied,
      image,
      validID,
      businessPermit,
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
    mailTransport.sendMail({
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
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " });
    console.log(error);
  }
};

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
