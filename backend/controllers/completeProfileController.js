const {
  userLifeStyleModel,
  userPreferencesModel,
} = require("../models/completeProfileModel");
const decodeUserId = require("../services/decodeUserId");

const completeProfileController = async (req, res) => {
  try {
    const user_id = decodeUserId(req);
    const { user_lifestyle, user_preferences } = req.body;
    if (!user_lifestyle || !user_preferences) {
      return res.status(400).json({
        success: false,
        message: "Missing required profile data",
      });
    }
    await userLifeStyleModel({
      user_lifestyle,
      user_id,
    });
    await userPreferencesModel({
      user_preferences,
      user_id,
    });
    return res.status(200).json({
      success: true,
      message: "Profile Submission Successful",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = completeProfileController;
