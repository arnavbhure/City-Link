const express = require("express");
const verificationController = require("../controllers/verificationContoller");
const verificationRouter = express.Router();

verificationRouter.get("/verify-email", verificationController);

module.exports = verificationRouter;
