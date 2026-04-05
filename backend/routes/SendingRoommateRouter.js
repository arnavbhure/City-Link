const express = require("express");
const sendingRoommateController = require("../controllers/sendingRoommateController");

const sendingRoommateRouter = express.Router();

sendingRoommateRouter.get("/getting-roommate", sendingRoommateController);

export default sendingRoommateRouter;
