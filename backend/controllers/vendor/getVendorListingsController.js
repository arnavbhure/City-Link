const getVendorListingsModel = require("../../models/vendor/getVendorListingsModel");
const {
  buildVendorListOptions,
} = require("../../services/vendor/vendorService");

const getVendorListingsController = async (req, res) => {
  try {
    const { filters, pagination, sort } = buildVendorListOptions({
      query: req.query,
      params: req.params,
    });

    const { rows, total } = await getVendorListingsModel({
      filters,
      pagination,
      sort,
    });

    const totalPages = Math.max(1, Math.ceil(total / pagination.limit));

    return res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching vendor listings:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch vendor listings",
    });
  }
};

module.exports = getVendorListingsController;
