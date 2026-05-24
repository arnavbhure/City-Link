const getBlockedUsersModel = require("../../models/chat/getBlockedUsersModel");

const getBlockedUsersController = async (req, res) => {
  try {
    const response = await getBlockedUsersModel(req.user.id);
    res.status(200).json({
      success: true,
      message: "Blocked users fetched successfully",
      data: response,
    });
  } catch (Err) {
    console.log("Error in getBlockedUsersController", Err);
    res.status(500).json({
      success: false,
      message: "Failed to get blocked users",
      data: [],
    });
  }
};
module.exports = getBlockedUsersController;
