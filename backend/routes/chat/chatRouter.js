const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const getMessagesChatController = require("../../controllers/chat/getMessagesChatController");
const sendSidebarUsersContoller = require("../../controllers/chat/sendSidebarUsersContoller");
const blockUserController = require("../../controllers/chat/blockUserController");
const getBlockedUsersController = require("../../controllers/chat/getBlockedUsersController");

const chatRouter = express.Router();

// for sending sidebar users based on their city
chatRouter.get(
  "/chat/get-sidebar-users",
  authMiddleware,
  sendSidebarUsersContoller,
);

// to get blocked users
chatRouter.get(
  "/chat/get-blocked-users",
  authMiddleware,
  getBlockedUsersController,
);

// to block the user for chat
chatRouter.post("/chat/block", authMiddleware, blockUserController);

// for gettting previous chats
chatRouter.get("/chat/:id", authMiddleware, getMessagesChatController);

module.exports = chatRouter;
