const axios = require("axios");

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "CityLink",
          email: process.env.EMAIL_USER,
        },
        to: [{ email: to }],
        subject,
        textContent: text,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );
    return true;
  } catch (err) {
    console.error("Email Error:", err.response?.data || err.message);
    return false;
  }
};

module.exports = { sendEmail };
