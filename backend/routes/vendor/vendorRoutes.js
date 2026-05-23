const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const createVendorListingController = require("../../controllers/vendor/createVendorListingController");
const getVendorListingsController = require("../../controllers/vendor/getVendorListingsController");
const getSingleVendorController = require("../../controllers/vendor/getSingleVendorController");
const {
  vendorCreateValidator,
  vendorListQueryValidator,
  vendorCategoryParamValidator,
  vendorCityParamValidator,
  vendorIdParamValidator,
} = require("../../validators/vendor/vendorValidator");
const { validateRequest } = require("../../validators/signup/validateResult");

const vendorRoutes = express.Router();

vendorRoutes.post(
  "/",
  vendorCreateValidator,
  validateRequest,
  createVendorListingController,
);

vendorRoutes.get(
  "/",
  vendorListQueryValidator,
  validateRequest,
  getVendorListingsController,
);

vendorRoutes.get(
  "/category/:category",
  vendorCategoryParamValidator,
  vendorListQueryValidator,
  validateRequest,
  getVendorListingsController,
);

vendorRoutes.get(
  "/city/:city",
  vendorCityParamValidator,
  vendorListQueryValidator,
  validateRequest,
  getVendorListingsController,
);

vendorRoutes.get(
  "/:id",
  vendorIdParamValidator,
  validateRequest,
  getSingleVendorController,
);

module.exports = vendorRoutes;
