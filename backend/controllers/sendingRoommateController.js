const getRoommateThroughCity = require("../models/getRoommateThroughCity");

const sendingRoommateController = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID required" });
    }

    const response = await getRoommateThroughCity(user_id);

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = sendingRoommateController;
