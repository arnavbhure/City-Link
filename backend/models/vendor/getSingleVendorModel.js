const pool = require("../../config/db");

const getSingleVendorModel = async (id) => {
  const result = await pool.query(
    "SELECT * FROM vendor_listings WHERE id = $1 AND is_active = true",
    [id],
  );

  return result.rows[0];
};

module.exports = getSingleVendorModel;
