const { body } = require("express-validator");

const completeProfileValidator = [
  body("user_lifestyle.bio")
    .trim()
    .notEmpty()
    .withMessage("Bio should not be empty"),
  body("user_lifestyle.cleanliness_level")
    .trim()
    .notEmpty()
    .withMessage("Fill all fields")
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid cleanliness level"),
  body("user_lifestyle.lifestyle_type")
    .trim()
    .notEmpty()
    .withMessage("Fill all fields")
    .isIn(["quiet", "social", "balanced"])
    .withMessage("Invalid lifestyle type"),
  body("user_lifestyle.sleep_schedule")
    .trim()
    .notEmpty()
    .withMessage("Fill all fields")
    .isIn(["night_owl", "early_riser", "any"])
    .withMessage("Invalid sleep schedule"),
  body("user_preferences.budget_max")
    .trim()
    .notEmpty()
    .withMessage("Fill all fields")
    .isNumeric()
    .withMessage("Budget should be Numeric only"),
  body("user_preferences.budget_min")
    .trim()
    .notEmpty()
    .withMessage("Fill all fields")
    .isNumeric()
    .withMessage("Budget should be Numeric only"),
  body("user_preferences.food_preference")
    .trim()
    .notEmpty()
    .withMessage("Fill all fields")
    .isIn(["veg", "non-veg", "any"])
    .withMessage("Invalid Food prefernce"),
  body("user_preferences.furnished_required")
    .trim()
    .notEmpty()
    .withMessage("Fill all fields")
    .isIn(["true", "false"])
    .withMessage("Invalid furnisher prefernce"),
  body("user_preferences.preferred_city")
    .trim()
    .notEmpty()
    .withMessage("Fill all fields")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Only alphabets allowed"),
  body("user_preferences.preferred_gender")
    .trim()
    .notEmpty()
    .withMessage("Fill all fields")
    .isIn(["male", "female", "any"])
    .withMessage("Invalid Gender prefernce"),
  body("user_preferences.smoking_preference")
    .trim()
    .notEmpty()
    .withMessage("Fill all fields")
    .isIn(["yes", "no", "any"])
    .withMessage("Invalid Smoking prefernce"),
  body("user_preferences.wants_shared_chores")
    .trim()
    .notEmpty()
    .withMessage("Fill all fields")
    .isIn(["true", "false"])
    .withMessage("Invalid prefernce"),
];

module.exports = completeProfileValidator;
