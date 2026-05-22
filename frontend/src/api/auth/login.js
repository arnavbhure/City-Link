import api from "../axios";
import { socket } from "../../lib/socket";

const login = async (formData) => {
  try {
    const response = await api.post("/auth/login", formData);

    socket.auth = { token: response.data.token };

    socket.connect();

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
