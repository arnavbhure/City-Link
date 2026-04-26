const pool = require("../config/db");

const getViewProfileModel = async (id) => {
  const response = await pool.query(
    `SELECT full_name , college , city , clg_year , course , is_verified , open_for_listing , profile_listing_completed FROM users WHERE id = $1`,
    [id],
  );
  return response.rows[0];
};

module.exports = getViewProfileModel;
