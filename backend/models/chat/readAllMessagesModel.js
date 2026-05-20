const pool = require("../../config/db");

const readAllMessagesModel = async (senderId, receiverId) => {
  const response = await pool.query(
    `UPDATE messages
     SET is_seen = true
     WHERE sender_id = $1
       AND receiver_id = $2
       AND is_seen = false`,
    [senderId, receiverId],
  );

  return response;
};

module.exports = readAllMessagesModel;
