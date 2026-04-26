import api from "../axios";

const getViewProfile = async (id) => {
  try {
    const response = await api.get("/view-profile", { params: { id } });
    return { success: true, data: response.data };
  } catch (err) {
    return { success: false, message: "Failed to fetch profile data" };
  }
};

export default getViewProfile;
