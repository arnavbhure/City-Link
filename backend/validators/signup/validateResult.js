const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req); // gathers errors from express-validator
  if (!errors.isEmpty()) {
    const errorList = errors.array();
    return res.status(400).json({
      success: false,
      message: errorList[0]?.msg || "Invalid request",
      errors: errorList,
    }); // send errors to client
  }
  next(); // no errors, proceed to controller
};

module.exports = { validateRequest };
