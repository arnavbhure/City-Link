const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { corsOptions, isOriginAllowed } = require("./corsOptions");
const checkIfEitherUserBlockedModel = require("../models/chat/checkifBlocked");
const createMessageModel = require("../models/chat/createMessageModel");
const readAllMessagesModel = require("../models/chat/readAllMessagesModel");

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
  const userId = socket.user?.id;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("chat:send", async (payload, callback) => {
    const safeCallback = typeof callback === "function" ? callback : null;
    const receiverId = payload?.receiverId;
    const rawMessage = payload?.message;
    const tempId = payload?.tempId;

    if (!userId) {
      if (safeCallback) {
        safeCallback({ ok: false, error: "Unauthorized", tempId });
      }
      return;
    }

    if (!receiverId || typeof rawMessage !== "string") {
      if (safeCallback) {
        safeCallback({ ok: false, error: "Invalid payload", tempId });
      }
      return;
    }

    const message = rawMessage.trim();
    if (!message) {
      if (safeCallback) {
        safeCallback({ ok: false, error: "Message is empty", tempId });
      }
      return;
    }

    if (message.length > 2000) {
      if (safeCallback) {
        safeCallback({ ok: false, error: "Message is too long", tempId });
      }
      return;
    }

    try {
      const isBlocked = await checkIfEitherUserBlockedModel(userId, receiverId);
      if (isBlocked) {
        if (safeCallback) {
          safeCallback({
            ok: false,
            error: "User interaction blocked",
            tempId,
          });
        }
        return;
      }

      const savedMessage = await createMessageModel(
        userId,
        receiverId,
        message,
      );
      const receiverSocketId = getReceiverSocketId(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("chat:message", {
          message: savedMessage,
        });
      }

      if (safeCallback) {
        safeCallback({ ok: true, message: savedMessage, tempId });
      }
    } catch (error) {
      console.error("Error sending chat message:", error);
      if (safeCallback) {
        safeCallback({ ok: false, error: "Failed to send message", tempId });
      }
    }
  });

  socket.on("chat:read", async (payload) => {
    const otherUserId = payload?.otherUserId;

    if (!userId || !otherUserId) {
      return;
    }

    try {
      await readAllMessagesModel(otherUserId, userId);
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  });

  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { io, app, server, getReceiverSocketId };
