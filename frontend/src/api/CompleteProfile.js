import api from "./axios";

const CompleteProfileResponse = async (formData) => {
  try {
    const response = await api.post("/complete-profile", formData);
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Profile Completion Failed";
    throw new Error(message);
  }
};

export default CompleteProfileResponse;
