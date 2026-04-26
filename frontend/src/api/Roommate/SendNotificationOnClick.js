import api from "../axios";

const sendNotificationOnClick = async ({
  profileId,
  email,
  senderName,
  user_id,
}) => {
  try {
    const response = await api.post("/roommate/send-notification", {
      profileId,
      email,
      senderName,
      user_id,
    });
    return response.data;
  } catch {
    return {
      success: false,
      message: "Failed to send notification. Please try again later.",
    };
  }
};

export default sendNotificationOnClick;
