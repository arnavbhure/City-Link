import api from "../axios";

const getSidebarUsers = async () => {
  try {
    const response = await api.get("/chat/get-sidebar-users");
    return response.data;
  } catch (error) {
    console.log("Error in fetching sidebar users:", error);
  }
};

export default getSidebarUsers;
