const pool = require("../config/db");

const getViewProfileModel = async (id) => {
  const response = await pool.query(
    `SELECT 
    u.id,
    u.full_name,
    u.college,
    u.course,
    u.clg_year,
    u.city,

    p.budget_min,
    p.budget_max,
    p.food_preference,
    p.smoking_preference,
    p.wants_shared_chores,
    p.preferred_gender,

    l.cleanliness_level,
    l.sleep_schedule,
    l.bio,
    l.lifestyle_type

FROM users u

LEFT JOIN user_preferences p ON u.id = p.user_id
LEFT JOIN user_lifestyle l ON u.id = l.user_id

WHERE u.id = $1;`,
    [id],
  );
  return response.rows[0];
};

module.exports = getViewProfileModel;
