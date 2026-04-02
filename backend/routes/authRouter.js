const express = require("express");
const { signupValidator } = require("../validators/signup/signupValidator");
const { validateRequest } = require("../validators/signup/validateResult");
const { signupController } = require("../controllers/signupController");
const { loginValidator } = require("../validators/login/loginValidator");
const { loginController } = require("../controllers/loginController");
const {
  resendVerificationController,
} = require("../controllers/resendVerificationController");
const {
  resendVerificationValidator,
} = require("../validators/login/resendVerificationValidator");
const sendUserInfoController = require("../controllers/sendUserInfoController");

const authRouter = express.Router();

authRouter.post("/signup", signupValidator, validateRequest, signupController);
authRouter.post("/login", loginValidator, validateRequest, loginController);
authRouter.post(
  "/resend-verification",
  resendVerificationValidator,
  validateRequest,
  resendVerificationController,
);
authRouter.get("/getUserInfo", sendUserInfoController);

module.exports = { authRouter };
