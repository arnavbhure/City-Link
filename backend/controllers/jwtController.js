const jwt = require("jsonwebtoken");
const { getUserById } = require("../models/userModel");

const jwtController = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No token provided.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const existingUser = await getUserById(decoded.userId);

    if (
      !existingUser ||
      !existingUser.is_verified ||
      existingUser.email !== decoded.email
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const { password_hash, verification_token, created_at, age, ...safeUser } =
      existingUser;

    return res.status(200).json({
      success: true,
      user: safeUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = jwtController;
