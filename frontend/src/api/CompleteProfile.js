import api from "./axios";

const CompleteProfileResponse = async (formData) => {
  try {
    const response = await api.post("/complete-profile", formData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Profile Completion Failed",
    };
  }
};

export default CompleteProfileResponse;
