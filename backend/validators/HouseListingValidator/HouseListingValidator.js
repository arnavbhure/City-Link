const { body } = require("express-validator");

const HouseListingValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title should not be empty")
    .isLength({ min: 5 })
    .withMessage("Title should be at least 5 characters long"),
  body("attachedWashroom")
    .isBoolean()
    .withMessage("Invalid value for attached washroom"),
  body("availableFrom")
    .trim()
    .notEmpty()
    .withMessage("Available from date should not be empty"),
  body("city").trim().notEmpty().withMessage("City should not be empty"),
  body("deposit").trim().notEmpty().withMessage("Deposit should not be empty"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description should not be empty"),
  body("furnished").isBoolean().withMessage("Invalid value for furnished"),
  body("houseRules")
    .trim()
    .notEmpty()
    .withMessage("House rules should not be empty")
    .isLength({ min: 11 })
    .withMessage("House rules should be at least 10 characters long"),
  body("laundry").isBoolean().withMessage("Invalid value for laundry"),
  body("locality")
    .trim()
    .notEmpty()
    .withMessage("Locality should not be empty"),
  body("meals").isBoolean().withMessage("Invalid value for meals"),
  body("powerBackup").isBoolean().withMessage("Invalid value for power backup"),
  body("propertyType")
    .trim()
    .notEmpty()
    .withMessage("Property type should not be empty")
    .isIn(["flat", "room", "pg"])
    .withMessage("Invalid property type"),
  body("rent").trim().notEmpty().withMessage("Rent should not be empty"),
  body("sharingType")
    .trim()
    .notEmpty()
    .withMessage("Sharing type should not be empty")
    .isIn(["Private room", "Twin sharing", "Triple sharing", "Entire place"])
    .withMessage("Invalid sharing type"),
  body("wifi").isBoolean().withMessage("Invalid value for wifi"),
];

module.exports = HouseListingValidator;
