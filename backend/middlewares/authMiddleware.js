const jwt = require("jsonwebtoken");
const { getUserById } = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
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
        message: "Unauthorized",
      });
    }

    req.user = existingUser;

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;
