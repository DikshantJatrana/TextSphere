import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getRecevierSocketID(userId) {
  return UserSocket[userId];
}

const UserSocket = {};

io.on("connection", (socket) => {
  console.log("A user is connected ", socket.id);

  const UserId = socket.handshake.query.UserId;
  if (UserId) UserSocket[UserId] = socket.id;

  io.emit("getOnlineUser", Object.keys(UserSocket));

  socket.on("disconnect", () => {
    console.log("A user is disconnected ", socket.id);
    delete UserSocket[UserId];
    io.emit("getOnlineUser", Object.keys(UserSocket));
  });
});

export { io, server, app };
