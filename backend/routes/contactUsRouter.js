const express = require("express");
const contactUsController = require("../controllers/contactUsController");
const contactUsRouter = express.Router();

contactUsRouter.post("/contact-us", contactUsController);

module.exports = contactUsRouter;
