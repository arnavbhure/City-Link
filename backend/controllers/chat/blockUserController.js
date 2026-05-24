const blockUserModel = require("../../models/chat/blockUserModel");

const blockUserController = async (req, res) => {
  try {
    const { toBlockId } = req.body;
    const userId = req.user.id;
    const response = await blockUserModel(userId, toBlockId);

    if (response === "blocked") {
      return res
        .status(200)
        .json({ message: "Succesfully Blocked the user", success: true });
    } else if (response === "unblocked") {
      return res
        .status(200)
        .json({ message: "Succesfully Unblocked the user", success: true });
    }

    return res
      .status(200)
      .json({ message: "Something went wrong", success: false });
  } catch (err) {
    console.log("Error in blockUserController: ", err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = blockUserController;
