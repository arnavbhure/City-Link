const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const editProfileController = require("../controllers/editProfileController");
const getEditProfileDataController = require("../controllers/getEditProfileDataController");
const editProfileValidator = require("../validators/editProfile/editProfileValidator");
const { validateRequest } = require("../validators/signup/validateResult");

const editProfileRouter = express.Router();

editProfileRouter.patch(
  "/profile/edit",
  authMiddleware,
  editProfileValidator,
  validateRequest,
  editProfileController,
);
editProfileRouter.get(
  "/get-edit-profile-data",
  authMiddleware,
  getEditProfileDataController,
);

module.exports = editProfileRouter;
