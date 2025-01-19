import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;

export const setToken = (user) => {
  const plaintxt = { id: user._id, email: user.email, fullName: user.fullName };
  return jwt.sign(plaintxt, SECRET, { expiresIn: "7d" });
};

export const getToken = (token) => {
  if (!token) return null;
  return jwt.verify(token, SECRET);
};
