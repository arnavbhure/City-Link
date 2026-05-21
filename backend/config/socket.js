const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { corsOptions, isOriginAllowed } = require("./corsOptions");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: corsOptions,
  allowRequest: (req, callback) => {
    callback(null, isOriginAllowed(req.headers.origin));
  },
});

const userSocketMap = {};

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  const userId = socket.user.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { io, app, server, getReceiverSocketId };
