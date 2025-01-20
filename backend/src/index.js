import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.connect.js";
import cors from "cors";
import { server, app } from "../src/lib/socket.js";
dotenv.config();

connectDB();
const PORT = process.env.PORT;
import authRoute from "./Router/auth.route.js";
import messageRoute from "./Router/message.route.js";

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/auth", authRoute);
app.use("/message", messageRoute);

server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
