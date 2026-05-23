const getSingleVendorModel = require("../../models/vendor/getSingleVendorModel");

const getSingleVendorController = async (req, res) => {
  try {
    const listing = await getSingleVendorModel(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Vendor listing not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    console.error("Error fetching vendor listing:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch vendor listing",
    });
  }
};

module.exports = getSingleVendorController;
