import api from "../axios";

const SubmitContactUs = async (data) => {
  try {
    const response = await api.post("/contact-us", data);
    if (response.data.success) {
      return response.data;
    }
    return {
      success: false,
      message: "An error occurred while submitting the contact us form.",
    };
  } catch (err) {
    console.error("Error submitting contact us form:", err);
    return {
      success: false,
      message: "An error occurred while submitting the contact us form.",
    };
  }
};
export default SubmitContactUs;
