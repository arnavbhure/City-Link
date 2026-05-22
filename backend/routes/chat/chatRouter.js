const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const getMessagesChatController = require("../../controllers/chat/getMessagesChatController");
const sendSidebarUsersContoller = require("../../controllers/chat/sendSidebarUsersContoller");

const chatRouter = express.Router();

// for sending sidebar users based on their city
chatRouter.get(
  "/chat/get-sidebar-users",
  authMiddleware,
  sendSidebarUsersContoller,
);

// for gettting previous chats
chatRouter.get("/chat/:id", authMiddleware, getMessagesChatController);

module.exports = chatRouter;
