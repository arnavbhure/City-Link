const { validationResult } = require("express-validator");
const editProfileModel = require("../models/edit-profile-model/editProfileModel");

const editProfileController = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const user = req.user;

    if (!user || !user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const data = req.body.data || {};

    if (
      data.budget_min &&
      data.budget_max &&
      Number(data.budget_min) > Number(data.budget_max)
    ) {
      return res.status(400).json({
        success: false,
        message: "Minimum budget cannot exceed maximum budget",
      });
    }

    const result = await editProfileModel(user.id, data);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error in editProfileController:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = editProfileController;
