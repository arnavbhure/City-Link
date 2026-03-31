const express = require("express");
const jwtController = require("../controllers/jwtController");
const jwtRouter = express.Router();

jwtRouter.get("/verify-token", jwtController);

module.exports = jwtRouter;
