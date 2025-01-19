import express from "express";
import Message from "../Model/message.model.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";
import {
  getMessage,
  getUserForSidebar,
  sendMessage,
} from "../Controller/message.controller.js";
const router = express.Router();

router.get("/users", authMiddleware, getUserForSidebar);

router.get("/:id", authMiddleware, getMessage);

router.post("/send/:id", authMiddleware, sendMessage);

export default router;
