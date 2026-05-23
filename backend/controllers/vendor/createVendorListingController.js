const createVendorListingModel = require("../../models/vendor/createVendorListingModel");
const {
  normalizeVendorPayload,
} = require("../../services/vendor/vendorService");

const createVendorListingController = async (req, res) => {
  try {
    const payload = normalizeVendorPayload(req.body);
    const listing = await createVendorListingModel(payload);

    if (!listing) {
      return res.status(400).json({
        success: false,
        message: "Failed to create vendor listing",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Vendor listing created",
      data: listing,
    });
  } catch (error) {
    console.error("Error creating vendor listing:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create vendor listing",
    });
  }
};

module.exports = createVendorListingController;
