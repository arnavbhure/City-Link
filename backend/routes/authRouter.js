const express = require("express");
const { signupValidator } = require("../validators/signup/signupValidator");
const { validateRequest } = require("../validators/signup/validateResult");
const { signupController } = require("../controllers/signupController");

const authRouter = express.Router();

authRouter.post("/signup", signupValidator, validateRequest, signupController);

module.exports = authRouter;
