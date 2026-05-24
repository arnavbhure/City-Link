const pool = require("../../config/db");

const getBlockedUsersModel = async (userId) => {
  const query = `SELECT
    u.id,
    u.full_name,
    u.city
FROM blocked_users bu

JOIN users u
ON u.id = bu.blocked_id

WHERE bu.blocker_id = $1

ORDER BY TRIM(u.full_name) ASC;`;
  const response = await pool.query(query, [userId]);
  return response.rows;
};

module.exports = getBlockedUsersModel;
