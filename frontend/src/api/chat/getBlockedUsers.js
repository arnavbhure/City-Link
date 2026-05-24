import api from "../axios";

const getBlockedUsers = async () => {
  try {
    const response = await api.get("/chat/get-blocked-users");
    return response.data;
  } catch (err) {
    console.error("Error fetching blocked users:", err);
    return {
      success: false,
      message: "Failed to fetch blocked users",
      data: [],
    };
  }
};

export default getBlockedUsers;
