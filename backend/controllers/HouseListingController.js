const PostHouseListingModel = require("../models/PostHouseListingModel");

const HouseListingController = async (req, res) => {
  try {
    const data = req.body;
    const response = await PostHouseListingModel(data);
    if (response) {
      return res.status(200).json({
        message: "House listing posted successfully.",
        success: true,
      });
      return res.status(400).json({
        message: "Failed to post the house listing.",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred while posting the house listing.",
      success: false,
    });
  }
};

module.exports = HouseListingController;
