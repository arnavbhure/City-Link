const { getUserByEmail, updateVerificationToken } = require("../models/userModel");
const verificationToken = require("../services/verificationToken");
const sendVerificationEmail = require("../services/emailService");

const resendVerificationController = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return res.status(404).json({ message: "Email does not exist" });
    }

    if (existingUser.is_verified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    const token = await verificationToken();
    await updateVerificationToken(email, token);
    await sendVerificationEmail(email, token);

    return res.status(200).json({
      message: "A new verification email has been sent. Please check your inbox.",
    });
  } catch (error) {
    console.error("Resend Verification Failed:", error);
    return res.status(500).json({
      message: "Could not resend verification email. Please try again later.",
    });
  }
};

module.exports = { resendVerificationController };
