const jwt = require("jsonwebtoken");

const isTokenValid = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return { isValid: true, decoded };
  } catch (error) {
    return { isValid: false, decoded: null };
  }
};
