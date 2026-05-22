const { getUserInfoDuringLogin } = require("../models/userModel");
const { comparePassword } = require("./password_hash");
const { createAuthToken } = require("../services/authToken");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await getUserInfoDuringLogin(email);

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Account with this email does not exist",
      });
    }

    if (!existingUser.is_verified) {
      return res.status(403).json({
        success: false,
        message:
          "Email not verified. Please verify your email before logging in.",
      });
    }

    const isPasswordValid = await comparePassword(
      password,
      existingUser.password_hash,
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const { password_hash, verification_token, created_at, age, ...safeUser } =
      existingUser;

    const { token, expiresAt } = createAuthToken(safeUser);

    // store JWT in secure httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      expiresAt,
      user: safeUser,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { loginController };
