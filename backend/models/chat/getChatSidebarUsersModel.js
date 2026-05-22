const pool = require("../../config/db");

const getChatSidebarUsersModel = async (id) => {
  const query = `
WITH latest_messages AS (
    SELECT DISTINCT ON (
        LEAST(sender_id, receiver_id),
        GREATEST(sender_id, receiver_id)
    )
        sender_id,
        receiver_id,
        message,
        created_at
    FROM messages
    ORDER BY
        LEAST(sender_id, receiver_id),
        GREATEST(sender_id, receiver_id),
        created_at DESC
)

SELECT
    u.id,

    u.full_name AS name,

    lm.message AS "lastMessage",

    lm.created_at AS "lastMessageTime",

    COALESCE(
        COUNT(
            CASE
                WHEN m.receiver_id = $1
                 AND m.is_seen = false
                THEN 1
            END
        ),
        0
    )::INT AS "unreadCount"

FROM users u

LEFT JOIN latest_messages lm
ON (
    (
        lm.sender_id = $1
        AND lm.receiver_id = u.id
    )
    OR
    (
        lm.receiver_id = $1
        AND lm.sender_id = u.id
    )
)

LEFT JOIN messages m
ON m.sender_id = u.id
AND m.receiver_id = $1
AND m.is_seen = false

WHERE
    u.city = (
        SELECT city
        FROM users
        WHERE id = $1
    )
AND u.id != $1

GROUP BY
    u.id,
    u.full_name,
    lm.message,
    lm.created_at

ORDER BY
    lm.created_at DESC NULLS LAST,
    u.full_name ASC;
`;
  const response = await pool.query(query, [id]);
  return response.rows;
};

module.exports = getChatSidebarUsersModel;
