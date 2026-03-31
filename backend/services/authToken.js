const jwt = require("jsonwebtoken");

const createAuthToken = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

  return { token, expiresAt };
};

module.exports = { createAuthToken };
