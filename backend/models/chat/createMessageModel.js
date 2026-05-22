const pool = require("../../config/db");

const createMessageModel = async (senderId, receiverId, message) => {
  const response = await pool.query(
    `INSERT INTO messages (sender_id, receiver_id, message, is_seen)
     VALUES ($1, $2, $3, false)
     RETURNING id, sender_id, receiver_id, message, created_at, is_seen`,
    [senderId, receiverId, message],
  );

  return response.rows[0];
};

module.exports = createMessageModel;
