const { getUserById, updateOpenForListing } = require("../models/userModel");
const decodeUserId = require("../services/decodeUserId");

const updateOpenForListingController = async (req, res) => {
  try {
    const userId = decodeUserId(req);
    const { open_for_listing } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    if (typeof open_for_listing !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "open_for_listing must be true or false",
      });
    }

    const existingUser = await getUserById(userId);

    if (!existingUser || !existingUser.is_verified) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedUser = await updateOpenForListing(userId, open_for_listing);

    const { password_hash, created_at, age, verification_token, ...safeUser } =
      updatedUser;

    return res.status(200).json({
      success: true,
      message: open_for_listing
        ? "Your profile is now visible in the roommates list"
        : "Your profile is now hidden from the roommates list",
      user: safeUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = updateOpenForListingController;
