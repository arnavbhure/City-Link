import api from "../axios";

const saveChangesEditProfile = async (formData) => {
  try {
    const response = await api.patch("/profile/edit", {
      data: formData,
    });

    return response.data;
  } catch (err) {
    console.error("Error saving profile:", err);

    return {
      success: false,
      message: err.response?.data?.message || "Error saving profile",
    };
  }
};

export default saveChangesEditProfile;
