const { body } = require("express-validator");

const editProfileValidator = [
  body("data.college")
    .trim()
    .notEmpty()
    .withMessage("College is required")
    .isLength({ min: 2, max: 120 })
    .withMessage("College must be between 2 and 120 characters"),

  body("data.course")
    .trim()
    .notEmpty()
    .withMessage("Course is required")
    .isLength({ min: 2, max: 120 })
    .withMessage("Course must be between 2 and 120 characters"),

  body("data.clg_year")
    .notEmpty()
    .withMessage("College year is required")
    .toInt()
    .isInt({ min: 1, max: 10 })
    .withMessage("College year must be between 1 and 10"),

  body("data.city")
    .trim()
    .notEmpty()
    .withMessage("City is required")
    .isLength({ min: 2, max: 80 })
    .withMessage("City must be between 2 and 80 characters"),

  body("data.budget_min")
    .notEmpty()
    .withMessage("Minimum budget is required")
    .toInt()
    .isInt({ min: 0 })
    .withMessage("Minimum budget must be a valid number"),

  body("data.budget_max")
    .notEmpty()
    .withMessage("Maximum budget is required")
    .toInt()
    .isInt({ min: 0 })
    .withMessage("Maximum budget must be a valid number"),

  body("data.food_preference")
    .notEmpty()
    .withMessage("Food preference is required")
    .isIn(["veg", "non-veg", "vegan", "any"])
    .withMessage("Invalid food preference"),

  body("data.smoking_preference")
    .notEmpty()
    .withMessage("Smoking preference is required")
    .isIn(["yes", "no", "any"])
    .withMessage("Invalid smoking preference"),

  body("data.wants_shared_chores")
    .exists()
    .withMessage("Shared chores preference is required")
    .toBoolean()
    .isBoolean()
    .withMessage("Shared chores must be true or false"),

  body("data.preferred_gender")
    .notEmpty()
    .withMessage("Preferred gender is required")
    .isIn(["male", "female", "any"])
    .withMessage("Invalid preferred gender"),

  body("data.cleanliness_level")
    .notEmpty()
    .withMessage("Cleanliness level is required")
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid cleanliness level"),

  body("data.sleep_schedule")
    .notEmpty()
    .withMessage("Sleep schedule is required")
    .isIn(["early_bird", "night_owl", "any"])
    .withMessage("Invalid sleep schedule"),

  body("data.bio")
    .trim()
    .notEmpty()
    .withMessage("Bio is required")
    .isLength({ max: 500 })
    .withMessage("Bio cannot exceed 500 characters"),

  body("data.lifestyle_type")
    .notEmpty()
    .withMessage("Lifestyle type is required")
    .isIn(["student", "working", "mixed", "balanced"])
    .withMessage("Invalid lifestyle type"),
];

module.exports = editProfileValidator;
