import { validationResult } from "express-validator";
import User from "../Model/user.model.js";
import BlackListedToken from "../Model/isBlackListed.model.js";
import bcrypt from "bcryptjs";
import { setToken } from "../lib/jwt.token.js";
import cloudinary from "../lib/cloudinary.js";

export const signupController = async (req, res) => {
  const Error = validationResult(req);
  if (!Error.isEmpty()) {
    return res.status(401).json({ error: Error.array() });
  }
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(401).send("Invalid Details");
  }
  try {
    const isUserAlready = await User.findOne({ email });
    if (isUserAlready) {
      return res.status(401).json({ msg: "user already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      fullName,
      email,
      password: hashPassword,
    });
    const token = setToken(user);
    res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.status(201).json({ token, user });
  } catch (error) {
    console.log(error);
  }
};

export const loginController = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(401).json({ error: error.array() });
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ msg: "Invalid User Details" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ msg: "User Not Found" });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).json({ msg: "Invalid User Details" });
    }

    const token = setToken(user);
    res.cookie("token", token);
    return res.status(201).json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const logoutController = async (req, res) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
  res.clearCookie("token");
  if (!token) {
    return res.status(201).json({ msg: "Logged out succesfully" });
  }
  const isBlackListed = await BlackListedToken.findOne({ token });
  if (!isBlackListed) {
    await BlackListedToken.create({ token });
    return res.status(201).json({ msg: "Logged out successfully" });
  } else {
    return res.status(401).json({ msg: "Unauthorized: Token is blacklisted" });
  }
};

export const ProfileController = async (req, res) => {
  return res.status(200).json(req.user);
};

export const UpdateContoller = async (req, res) => {
  const { profilePic } = req.body;
  if (!profilePic) {
    return res.status(400).json({ msg: "No profile picture provided" });
  }
  try {
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json({ msg: "Profile picture updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error updating profile picture" });
  }
};
