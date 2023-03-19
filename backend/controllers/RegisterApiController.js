import * as dotenv from "dotenv";
dotenv.config();
import RegisteredUser from "../models/RegisterSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(204).json("invalid input");
  }

  const userExists = await RegisteredUser.findOne({ email });
  if (userExists) {
    return res.status(406).json("User already registered");
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt); // 10 -> saltrounds

  const user = new RegisteredUser({
    email,
    password: hashedPassword,
  });

  await user.save();

  return res.status(201).json({ message: "user is registered" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(204).json("invalid input");
  }
  try {
    const user = await RegisteredUser.findOne({ email });

    if (!user) {
      return res.status(406).json({ message: "User is not registered" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Password doesn't matched" });
    }

    const payload = {
      email: user.email,
      id: user._id,
    };
    // console.log("user...");
    console.log(payload);
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    // console.log(window.location.href);
    // console.log(token);
    let options = {
      path: "/",
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
      httpOnly: true, // The cookie only accessible by the web server
    };

    return res.json({ message: "login success", token, email: user.email });
  } catch (err) {
    return res.status(408).json({ message: "server error" });
  }
};


export const getEmail = async(req, res) => {
  
}

export const HomeGet = async (req, res) => {
  const token = req.headers["x-access-token"];
//   console.log(token);
  try {
  	const decoded = jwt.verify(token, process.env.JWT_SECRET)
  	const email = decoded.email
  	const user = await RegisterSchema.findOne({ email: email })
    const Email = user.email

    // console.log('decoded-email => ', decoded.email);
  	return res.status(200).json({ status: 'ok', email: Email })
  } catch (error) {
  	console.log(error)
  	res.json({ status: 'error', error: 'invalid token' })
  }
};