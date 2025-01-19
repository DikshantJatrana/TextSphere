import { getToken } from "../lib/jwt.token.js";
import BlackListedToken from "../Model/isBlackListed.model.js";
import User from "../Model/user.model.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Token Not Found" });
  }
  const isTokenBlackListed = await BlackListedToken.findOne({ token });
  if (isTokenBlackListed) {
    return res.status(401).json({ msg: "No User Found" });
  }
  const getTokenData = getToken(token);
  if (!getTokenData) {
    return res.status(401).json({ msg: "No Token Data Found" });
  }
  const user = await User.findOne({ _id: getTokenData.id });
  if (!user) {
    return res.status(401).json({ msg: "No User Found" });
  }
  req.user = user;
  next();
};
