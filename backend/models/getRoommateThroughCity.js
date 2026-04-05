const pool = require("../config/db");

const getRoommateThroughCity = async (id) => {
  const response = await pool.query(
    `SELECT 
      u.id,
      u.name,
      u.university,
      u.course,
      u.year,
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

    JOIN users current_user ON current_user.id = $1
    JOIN user_preferences p ON u.id = p.user_id
    JOIN user_lifestyle l ON u.id = l.user_id

    WHERE 
      u.city = current_user.city
      AND u.open_for_listing = true
      AND u.id != $1;`,
    [id],
  );
  console.log(response.rows);
  return response.rows[0];
};

module.exports = getRoommateThroughCity;
