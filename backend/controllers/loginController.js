const { getUserByEmail } = require("../models/userModel");
const { comparePassword } = require("./password_hash");

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

    if (!comparePassword(password, existinguser.password_hash)) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Login Failed:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { loginController };
