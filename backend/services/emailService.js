const axios = require("axios");

const sendVerificationEmail = async (email, token) => {
  try {
    const BASE_URL = process.env.BASE_URL;
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "CityLink",
          email: "citylink1208@gmail.com",
        },
        to: [{ email }],
        subject: "Verify your email for CityLink",
        htmlContent: `<p>Dear User,</p>
        <p>Thank you for signing up for CityLink! Please click the link below to verify your email address:</p>
        <a href="${BASE_URL}/verify-email?token=${token}">Verify Email</a>`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );
    return true;
  } catch (error) {
    throw new Error("Failed to send verification email: " + error.message);
  }
};
module.exports = sendVerificationEmail;
