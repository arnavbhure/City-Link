const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const getMessagesChatController = require("../../controllers/chat/getMessagesChatController");

const chatRouter = express.Router();

chatRouter.get("/chat/:id", authMiddleware, getMessagesChatController);

module.exports = chatRouter;
