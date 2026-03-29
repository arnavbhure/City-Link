import api from "../axios";

export const signup = async (formData) => {
  try {
    const response = await api.post("/auth/signup", formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
    throw error;
  }
};
