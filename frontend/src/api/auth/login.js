import { clearStoredAuth, storeAuthToken } from "../../utils/auth";
import api from "../axios";

const login = async (formData) => {
  try {
    const response = await api.post("/auth/login", formData);
    storeAuthToken(response.data.token, response.data.expiresAt);
    return response.data;
  } catch (error) {
    if (error.response) {
      clearStoredAuth();
      throw new Error(
        error.response.data.message || "Login failed. Please try again.",
      );
    }
    throw error;
  }
};

export default login;
