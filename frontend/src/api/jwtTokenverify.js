import api from "./axios";

const jwtTokenVerify = async () => {
  try {
    const response = await api.get("/auth/verify-token");
    return response.data;
  } catch {
    return { success: false };
  }
};

export default jwtTokenVerify;
