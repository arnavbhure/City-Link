const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const getMessagesChatController = require("../../controllers/chat/chatController");

const chatRouter = express.Router();

chatRouter.get("/chat/:id", authMiddleware, getMessagesChatController);

module.exports = chatRouter;
