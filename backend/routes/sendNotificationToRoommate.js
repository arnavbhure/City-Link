const express = require("express");
const sendNotificationToRoommateControlller = require("../controllers/sendNotificationToRoommateControlller");
const sendNotificationToRoommateRouter = express.Router();

sendNotificationToRoommateRouter.post(
  "/roommate/send-notification",
  sendNotificationToRoommateControlller,
);

module.exports = sendNotificationToRoommateRouter;
