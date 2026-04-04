const express = require("express");
const completeProfileController = require("../controllers/completeProfileController");
const completeProfileValidator = require("../validators/completeProfile/completeProfileValidator");
const { validateRequest } = require("../validators/signup/validateResult");

const completeProfileRouter = express.Router();

completeProfileRouter.post(
  "/complete-profile",
  completeProfileValidator,
  validateRequest,
  completeProfileController,
);

module.exports = completeProfileRouter;
