const pool = require("../../config/db");

const getAllMessagesModel = async (user1Id, user2Id) => {
  const response = await pool.query(
    `SELECT *
     FROM messages
     WHERE (sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1)
     ORDER BY created_at ASC`,
    [user1Id, user2Id],
  );

  return response.rows;
};

module.exports = getAllMessagesModel;
