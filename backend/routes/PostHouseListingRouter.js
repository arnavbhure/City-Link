const express = require("express");
const HouseListingValidator = require("../validators/HouseListingValidator/HouseListingValidator");
const { validateRequest } = require("../validators/signup/validateResult");
const HouseListingController = require("../controllers/HouseListingController");
const { listingLimiter } = require("../middlewares/rateLimiter");

const PostHouseListingRouter = express.Router();

PostHouseListingRouter.use(listingLimiter);

PostHouseListingRouter.post(
  "/posting-house-listing",
  HouseListingValidator,
  validateRequest,
  HouseListingController,
);

module.exports = PostHouseListingRouter;
