import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Client from "../models/client.js";

export const getClients = async (req, res) => {
  try {
    const user = await Client.find();
    console.log("getuser ok");
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  const { email, password , birthday, name} = req.body;

  try {
    const oldClient = await Client.findOne({ email });
    if (oldClient)
      return res.status(400).json({ message: "Client already exist" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await Client.create({
      email,
      name,
      birthday,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET,
      {
        expiresIn: "1w",
      }
    );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " });
    console.log(error);
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
      { expiresIn: "1w" }
    );
    console.log("login ok");
    res.status(200).json({ result: oldClient, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
