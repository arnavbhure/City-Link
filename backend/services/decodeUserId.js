const jwt = require("jsonwebtoken");

const decodeUserId = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return;
  }
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return decoded.userId;
};

module.exports = decodeUserId;
