const verifyUserFromToken = require("../utils/verifyTokenFromUser");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    const user = await verifyUserFromToken(token);

    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = authMiddleware;
