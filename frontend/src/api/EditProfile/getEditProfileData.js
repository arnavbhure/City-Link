import api from "../axios";

const getEditProfileData = async () => {
  try {
    const response = await api.get("/get-edit-profile-data");
    return response.data;
  } catch (err) {
    console.error("Error in getting user profile data. ", err);
    return { success: false, message: "Error in getting user profile data." };
  }
};

export default getEditProfileData;
