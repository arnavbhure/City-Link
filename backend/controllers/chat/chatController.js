const checkIfEitherUserBlockedModel = require("../../models/chat/checkifBlocked");
const getAllMessagesModel = require("../../models/chat/getAllMessagesModel");
const readAllMessagesModel = require("../../models/chat/readAllMessagesModel");

const getMessagesChatController = async (req, res) => {
  try {
    const receiverId = req.params.id; // id of user which is receiving chat
    const senderId = req.user.id; // id of user which is sending chat (authenticated user)

    //check if either receiver or sender has blocked each other
    const isBlocked = await checkIfEitherUserBlockedModel(senderId, receiverId);
    if (isBlocked) {
      return res.status(403).json({
        success: false,
        message: "User interaction blocked",
      });
    }

    // update messages as read
    await readAllMessagesModel(senderId, receiverId);

    const response = await getAllMessagesModel(receiverId, senderId);
    if (!response) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to retrieve messages" });
    }
    return res.status(200).json({ success: true, messages: response });
  } catch (err) {
    console.error("Error in chatController:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = getMessagesChatController;
