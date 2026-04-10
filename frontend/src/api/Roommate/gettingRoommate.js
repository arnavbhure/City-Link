import api from "../axios";

const gettingRoommate = async (userId) => {
  try {
    if (!userId) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    const response = await api.get("/getting-roommate", {
      params: { user_id: userId },
    });

    return response.data;
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Something went wrong",
    };
  }
};

export default gettingRoommate;
