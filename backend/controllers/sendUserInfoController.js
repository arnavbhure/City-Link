const { getUserById } = require("../models/userModel");

const jwt = require("jsonwebtoken");

const sendUserInfoController = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(404).json({ success: false, message: "Invalid request" });
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
      message: "Invalid request",
    });
  }
  return res.json({ success: true, user: existingUser });
};

module.exports = sendUserInfoController;
