import api from "../axios";

const getChatMessages = async (userId) => {
  if (!userId) return null;

  try {
    const response = await api.get(`/chat/${userId}`);
    return response.data;
  } catch (error) {
    console.log("Error in fetching chat messages:", error);
    return null;
  }
};

export default getChatMessages;
