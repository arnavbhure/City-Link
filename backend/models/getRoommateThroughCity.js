const pool = require("../config/db");

const getRoommateThroughCity = async (id) => {
  const response = await pool.query(
    `SELECT 
      u.id,
      u.full_name AS name,
      u.college AS university,
      u.course,
      u.clg_year AS year,
      u.city,

      p.budget_min,
      p.budget_max,
      p.preferred_gender,
      p.food_preference,
      p.smoking_preference,
      p.preferred_city,
      p.furnished_required,
      p.wants_shared_chores,

      l.lifestyle_type,
      l.sleep_schedule,
      l.cleanliness_level,
      l.bio

    FROM users u

    JOIN users viewer ON viewer.id = $1
    JOIN user_preferences p ON u.id = p.user_id
    JOIN user_lifestyle l ON u.id = l.user_id

    WHERE 
      u.city = viewer.city
      AND u.open_for_listing = true
      AND u.id != $1;`,
    [id],
  );
  return response.rows;
};

module.exports = getRoommateThroughCity;
