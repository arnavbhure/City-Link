const jwt = require("jsonwebtoken");
const { getUserById } = require("../models/userModel");

const jwtController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Request" });
    }

    const token = authHeader.split(" ")[1];

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

    const { password_hash, verification_token, ...safeUser } = existingUser;

    return res.status(200).json({
      success: true,
      user: safeUser,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = jwtController;
