const jwt = require("jsonwebtoken");
const { getUserById } = require("../models/userModel");

const verifyUserFromToken = async (token) => {
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const existingUser = await getUserById(decoded.userId);

  if (
    !existingUser ||
    !existingUser.is_verified ||
    existingUser.email !== decoded.email
  ) {
    throw new Error("Unauthorized");
  }

  return existingUser;
};

module.exports = verifyUserFromToken;
