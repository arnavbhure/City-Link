const express = require("express");
const { signupValidator } = require("../validators/signup/signupValidator");
const { validateRequest } = require("../validators/signup/validateResult");
const { signupController } = require("../controllers/signupController");
const { loginValidator } = require("../validators/login/loginValidator");
const { loginController } = require("../controllers/loginController");

const authRouter = express.Router();

authRouter.post("/signup", signupValidator, validateRequest, signupController);
authRouter.post("/login", loginValidator, validateRequest, loginController);

module.exports = { authRouter };
