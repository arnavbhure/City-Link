import api from "../axios";

const toggleBlockUser = async (toBlockId) => {
  try {
    const response = await api.post("/chat/block", { toBlockId });
    return response.data;
  } catch (err) {
    console.log("Error in Blocking User", err);
    return { success: false, message: "Error in Blocking User" };
  }
};
export default toggleBlockUser;
