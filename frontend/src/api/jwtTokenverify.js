import api from "./axios";

const jwtTokenVerify = async (token) => {
  if (!token) {
    return { success: false };
  }

  try {
    const response = await api.get("/auth/verify-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch {
    return { success: false };
  }
};

export default jwtTokenVerify;
