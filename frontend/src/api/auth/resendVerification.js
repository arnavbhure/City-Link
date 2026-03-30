import api from "../axios";

const resendVerification = async (email) => {
  try {
    const response = await api.post("/auth/resend-verification", { email });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message ||
          "Could not resend verification email. Please try again.",
      );
    }
    throw error;
  }
};

export default resendVerification;
