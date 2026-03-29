const { body } = require("express-validator");

const signupValidator = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .isInt({ min: 18 })
    .withMessage("You must be at least 18 years old"),
  body("agree")
    .notEmpty()
    .withMessage("You must agree to the terms and conditions")
    .isBoolean()
    .withMessage("Agree must be a boolean value"),
  body("city").trim().notEmpty().withMessage("City is required"),
  body("clg_year").notEmpty().withMessage("College year is required"),
  body("college").trim().notEmpty().withMessage("College is required"),
  body("course").trim().notEmpty().withMessage("Course is required"),
];

module.exports = { signupValidator };
