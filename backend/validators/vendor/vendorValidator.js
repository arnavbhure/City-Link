const { body, param, query } = require("express-validator");
const {
  VENDOR_CATEGORIES,
  getCategoryDetailFields,
} = require("../../services/vendor/vendorCategoryConfig");

const isStringArray = (value) =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const categoryDetailsValidator = body("category_details").custom(
  (value, { req }) => {
    const category = req.body.category;
    const allowedFields = getCategoryDetailFields(category);

    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error("category_details must be an object");
    }

    const keys = Object.keys(value);
    const invalidKeys = keys.filter((key) => !allowedFields.includes(key));
    if (invalidKeys.length) {
      throw new Error(
        `Invalid category_details fields: ${invalidKeys.join(", ")}`,
      );
    }

    keys.forEach((key) => {
      const fieldValue = value[key];
      if (
        fieldValue === null ||
        fieldValue === undefined ||
        fieldValue === ""
      ) {
        return;
      }

      if (Array.isArray(fieldValue)) {
        if (!isStringArray(fieldValue)) {
          throw new Error(`category_details.${key} must be string array`);
        }
        return;
      }

      if (typeof fieldValue !== "string") {
        throw new Error(`category_details.${key} must be a string`);
      }
    });

    return true;
  },
);

const vendorCreateValidator = [
  body("category")
    .trim()
    .isIn(VENDOR_CATEGORIES)
    .withMessage("Invalid category"),
  body("business_name")
    .trim()
    .notEmpty()
    .withMessage("Business name is required"),
  body("owner_name").trim().notEmpty().withMessage("Owner name is required"),
  body("phone").trim().notEmpty().withMessage("Phone is required"),
  body("verified_phone")
    .trim()
    .notEmpty()
    .withMessage("Verified phone is required"),
  body("city").trim().notEmpty().withMessage("City is required"),
  body("area").trim().notEmpty().withMessage("Area is required"),
  body("whatsapp").optional({ checkFalsy: true }).trim(),
  body("description").optional({ checkFalsy: true }).trim(),
  body("photos")
    .optional()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error("photos must be an array");
      }
      const isValid = value.every(
        (item) => typeof item === "string" || typeof item?.name === "string",
      );
      if (!isValid) {
        throw new Error("photos must be string array");
      }
      return true;
    }),
  categoryDetailsValidator,
];

const vendorListQueryValidator = [
  query("page").optional().isInt({ min: 1 }).withMessage("Invalid page"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Invalid limit"),
  query("sortBy")
    .optional()
    .isIn(["created_at", "updated_at", "business_name", "city"])
    .withMessage("Invalid sort field"),
  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Invalid sort order"),
  query("category")
    .optional()
    .isIn(VENDOR_CATEGORIES)
    .withMessage("Invalid category filter"),
  query("city").optional().trim().isLength({ min: 2, max: 100 }),
  query("area").optional().trim().isLength({ min: 2, max: 120 }),
  query("search").optional().trim().isLength({ min: 2, max: 120 }),
  query("is_verified")
    .optional()
    .isIn(["true", "false"])
    .withMessage("Invalid verified filter"),
  query("is_active")
    .optional()
    .isIn(["true", "false"])
    .withMessage("Invalid active filter"),
];

const vendorCategoryParamValidator = [
  param("category")
    .trim()
    .isIn(VENDOR_CATEGORIES)
    .withMessage("Invalid category"),
];

const vendorCityParamValidator = [
  param("city")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Invalid city"),
];

const vendorIdParamValidator = [
  param("id").isUUID().withMessage("Invalid vendor id"),
];

module.exports = {
  vendorCreateValidator,
  vendorListQueryValidator,
  vendorCategoryParamValidator,
  vendorCityParamValidator,
  vendorIdParamValidator,
};
