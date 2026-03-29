const pool = require("../config/db");

const verficationModel = async (token) => {
  const response = await pool.query(
    `UPDATE users SET is_verified = true , verification_token = null WHERE verification_token = $1 RETURNING *`,
    [token],
  );
  return response.rows[0];
};

module.exports = verficationModel;
