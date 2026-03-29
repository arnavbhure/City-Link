import api from "../axios";

const login = async (formData) => {
  try {
    const response = await api.post("/auth/login", formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Login failed. Please try again.",
      );
    }
    throw error;
  }
};

export default login;
