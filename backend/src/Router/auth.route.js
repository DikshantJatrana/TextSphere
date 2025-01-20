import express from "express";
import { body } from "express-validator";
import {
  signupController,
  loginController,
  logoutController,
  ProfileController,
  UpdateContoller,
} from "../Controller/auth.controller.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";
const router = express.Router();

router.post(
  "/signup",
  body("fullName").notEmpty().isLength({ min: 3 }).withMessage("Invalid Name"),
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 6 }).withMessage("Invalid Password"),
  signupController
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 6 }).withMessage("Invalid Password"),
  loginController
);

router.post("/logout", authMiddleware, logoutController);

router.get("/profile", authMiddleware, ProfileController);

router.post("/update", authMiddleware, UpdateContoller);

export default router;
