const getHouseListingModel = require("../models/getHouseListingModel");

const sendHouseListingsController = async (req, res) => {
  try {
    const city = req.query.city?.trim().toLowerCase();
    if (!city) {
      return res
        .status(400)
        .json({ success: false, message: "City is required" });
    }
    const houseListings = await getHouseListingModel(city);
    return res.status(200).json({ success: true, data: houseListings });
  } catch (err) {
    console.log("Error fetching house listings:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = sendHouseListingsController;
