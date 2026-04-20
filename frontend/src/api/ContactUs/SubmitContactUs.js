const SubmitContactUs = async (data) => {
  try {
    const response = await api.post("/contact-us", data);
    if (response.success) {
      return response;
    }
    return {
      success: false,
      message: "An error occurred while submitting the contact us form.",
    };
  } catch {
    return {
      success: false,
      message: "An error occurred while submitting the contact us form.",
    };
  }
};
export default SubmitContactUs;
