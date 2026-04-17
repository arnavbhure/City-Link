const express = require("express");
const HouseListingValidator = require("../validators/HouseListingValidator/HouseListingValidator");
const { validateRequest } = require("../validators/signup/validateResult");

const PostHouseListingRouter = express.Router();

PostHouseListingRouter.post(
  "/posting-house-listing",
  HouseListingValidator,
  validateRequest,
  HouseListingController,
);

module.exports = PostHouseListingRouter;
