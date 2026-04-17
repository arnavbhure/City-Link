const HouseListingController = async (req, res) => {
  try {
  } catch {
    return res.status(500).json({
      message: "An error occurred while posting the house listing.",
      success: false,
    });
  }
};

module.exports = HouseListingController;
