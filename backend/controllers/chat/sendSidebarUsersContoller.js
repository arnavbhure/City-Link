const getChatSidebarUsersModel = require("../../models/chat/getChatSidebarUsersModel");
const getUsersFromSameCityModel = require("../../models/chat/getChatSidebarUsersModel");

const sendSidebarUsersContoller = async (req, res) => {
  try {
    const userid = req.user.id;
    const response = await getChatSidebarUsersModel(userid);

    if (!response) {
      return res.status(404).json({
        message: "No users found in the same city",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Sidebar users fetched successfully",
      success: true,
      data: response,
    });
  } catch (err) {
    console.log("Error in sendSidebarUsersContoller", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

module.exports = sendSidebarUsersContoller;
