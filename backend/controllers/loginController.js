const { getUserInfoDuringLogin } = require("../models/userModel");
const { comparePassword, hashPassword } = require("./password_hash");
const { createAuthToken } = require("../services/authToken");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existinguser = await getUserInfoDuringLogin(email);

    if (!existinguser) {
      return res
        .status(400)
        .json({ message: "Account with this email does not exists" });
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

    const { password_hash, verification_token, created_at, age, ...safeUser } =
      existinguser;

    const { token, expiresAt } = createAuthToken(safeUser);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      expiresAt,
      user: safeUser,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { loginController };
