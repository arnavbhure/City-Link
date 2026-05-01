const axios = require("axios");

const sendVerificationEmail = async (email, token) => {
  try {
    const BASE_URL = process.env.BASE_URL;
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "CityLink",
          email: process.env.EMAIL_USER,
        },
        to: [{ email }],
        subject: "Verify your email for CityLink",
        htmlContent: `<body
    style="
      margin: 0;
      padding: 0;
      background-color: #0f172a;
      font-family: Arial, sans-serif;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="background-color: #0f172a; padding: 40px 0"
    >
      <tr>
        <td align="center">
          <!-- Card -->
          <table
            width="500"
            cellpadding="0"
            cellspacing="0"
            style="
              background: #020617;
              border-radius: 16px;
              padding: 32px;
              border: 1px solid rgba(255, 255, 255, 0.08);
            "
          >
            <!-- Logo / Title -->
            <tr>
              <td align="center" style="padding-bottom: 20px">
                <h1 style="color: #7C86FF; margin: 0; font-size: 34px">
                  CityLink
                </h1>
                <p style="color: #94a3b8; margin-top: 6px">
                  Trusted student housing starts here
                </p>
              </td>
            </tr>

            <!-- Heading -->
            <tr>
              <td align="center" style="padding: 20px 0">
                <h2 style="color: #ffffff; margin: 0; font-size: 22px">
                  Verify your email address
                </h2>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td
                align="center"
                style="
                  color: #cbd5f5;
                  font-size: 14px;
                  line-height: 1.6;
                  padding: 0 10px;
                "
              >
                <p style="margin: 0">
                  Thanks for signing up for CityLink. Please confirm your email
                  to continue your housing journey safely.
                </p>
              </td>
            </tr>

            <!-- Button -->
            <tr>
              <td align="center" style="padding: 30px 0">
                <a
                  href="${BASE_URL}/verify-email?token=${token}"
                  style="
                    background: linear-gradient(90deg, #6366f1, #06b6d4);
                    color: #ffffff;
                    text-decoration: none;
                    padding: 14px 28px;
                    border-radius: 999px;
                    font-weight: bold;
                    display: inline-block;
                  "
                >
                  Verify Email
                </a>
              </td>
            </tr>

            <!-- Fallback link -->
            <tr>
              <td align="center" style="font-size: 12px; color: #64748b">
                <p>If the button doesn’t work, copy and paste this link:</p>
                <p style="word-break: break-all; color: #38bdf8">
                  ${BASE_URL}/verify-email?token=${token}
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                align="center"
                style="padding-top: 30px; font-size: 12px; color: #475569"
              >
                <p style="margin: 0">
                  If you didn’t create an account, you can safely ignore this
                  email.
                </p>
                <p style="margin-top: 8px">
                  © ${new Date().getFullYear()} CityLink
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>`,
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
