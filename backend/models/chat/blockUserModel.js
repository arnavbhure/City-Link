const pool = require("../../config/db");

const blockUserModel = async (userId, toBlockId) => {
  const query = `WITH existing_block AS (
    SELECT id
    FROM blocked_users
    WHERE blocker_id = $1
      AND blocked_id = $2
),

deleted AS (
    DELETE FROM blocked_users
    WHERE id IN (
        SELECT id FROM existing_block
    )
    RETURNING 'unblocked' AS action
),

inserted AS (
    INSERT INTO blocked_users (
        blocker_id,
        blocked_id
    )
    SELECT
        $1,
        $2
    WHERE NOT EXISTS (
        SELECT 1 FROM existing_block
    )
    RETURNING 'blocked' AS action
)

SELECT action FROM deleted
UNION ALL
SELECT action FROM inserted;`;

  const response = await pool.query(query, [userId, toBlockId]);
  return response.rows[0]?.action || null;
};

module.exports = blockUserModel;
