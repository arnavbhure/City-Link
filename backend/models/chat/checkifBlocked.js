const pool = require("../../config/db");

const checkIfEitherUserBlockedModel = async (userId, otherUserId) => {
  const response = await pool.query(
    `SELECT * FROM blocked_users
     WHERE (blocker_id = $1 AND blocked_id = $2)
        OR (blocker_id = $2 AND blocked_id = $1)
     LIMIT 1`,
    [userId, otherUserId],
  );

  return response.rows.length > 0;
};

module.exports = checkIfEitherUserBlockedModel;
