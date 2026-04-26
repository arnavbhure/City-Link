const express = require("express");
const viewProfileController = require("../controllers/viewProfileController");
const viewProfileRouter = express.Router();

viewProfileRouter.get("/view-profile", viewProfileController);

module.exports = viewProfileRouter;
