const verifyUserFromToken = require("../utils/verifyTokenFromUser");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    const user = await verifyUserFromToken(token);

    if (!user.profile_listing_completed) {
      return res.status(403).json({
        success: false,
        message: "Profile listing not completed",
      });
    }

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
