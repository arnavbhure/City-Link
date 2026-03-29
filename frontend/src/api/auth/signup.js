import api from "../axios";

export const signup = async (formData) => {
  try {
    const response = await api.post("/auth/signup", formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      const message =
        error.response.data.message ||
        error.response.data.errors?.[0]?.msg ||
        "Signup failed";
      throw new Error(message);
    }
    throw error;
  }
};
