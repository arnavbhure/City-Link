const { getUserByEmail } = require("../models/userModel");
const { comparePassword, hashPassword } = require("./password_hash");
const { createAuthToken } = require("../services/authToken");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existinguser = await getUserByEmail(email);

    if (!existinguser) {
      return res.status(400).json({ message: "Email does not exist" });
    } else if (!existinguser.is_verified) {
      return res.status(400).json({
        message:
          "Email not verified. Please verify your email before logging in.",
      });
    }
    const isPasswordValid = await comparePassword(
      password,
      existinguser.password_hash,
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    const { password_hash, verification_token, ...safeUser } = existinguser;
    const { token, expiresAt } = createAuthToken(existinguser);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      expiresAt,
      user: safeUser,
    });
  } catch (error) {
    console.error("Login Failed:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { loginController };
