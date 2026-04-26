const getViewProfileModel = require("../models/getViewProfileModel");

const viewProfileController = async (req, res) => {
  try {
    const { id } = req.query;
    const cleanId = id?.startsWith(":") ? id.slice(1) : id;
    if (!cleanId) {
      return res.status(400).json({
        success: true,
        message: "User id is required to view profile",
      });
    }
    const response = await getViewProfileModel(cleanId);
    if (!response) {
      return res.status(404).json({
        success: true,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: response,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = viewProfileController;
