const express = require("express");
const sendHouseListingsController = require("../controllers/sendHouseListingsController");
const sendHouseListingsRouter = express.Router();

sendHouseListingsRouter.get("/get-house-listings", sendHouseListingsController);

module.exports = sendHouseListingsRouter;
