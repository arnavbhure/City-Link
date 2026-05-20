const jwt = require("jsonwebtoken");

const decodeUserId = (req) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return decoded.userId;
};

module.exports = decodeUserId;
