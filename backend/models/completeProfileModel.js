const pool = require("../config/db");

const userPreferencesModel = async ({ user_preferences, user_id }) => {
  const {
    budget_max,
    budget_min,
    food_preference,
    furnished_required,
    preferred_city,
    preferred_gender,
    smoking_preference,
    wants_shared_chores,
  } = user_preferences;
  const response = await pool.query(
    `INSERT INTO user_preferences (
      user_id,
      budget_max,
      budget_min,
      food_preference,
      furnished_required,
      preferred_city,
      preferred_gender,
      smoking_preference,
      wants_shared_chores) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [
      user_id,
      budget_max,
      budget_min,
      food_preference,
      furnished_required,
      preferred_city,
      preferred_gender,
      smoking_preference,
      wants_shared_chores,
    ],
  );
  return response.rows[0];
};

const userLifeStyleModel = async ({ user_lifestyle, user_id }) => {
  const { bio, cleanliness_level, lifestyle_type, sleep_schedule } =
    user_lifestyle;
  const response = await pool.query(
    `INSERT INTO user_lifestyle (user_id, bio, cleanliness_level, lifestyle_type, sleep_schedule) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [user_id, bio, cleanliness_level, lifestyle_type, sleep_schedule],
  );
  return response.rows[0];
};

const updateProfileCompletionStatus = async ({ user_id }) => {
  const response = await pool.query(
    `UPDATE users SET profile_listing_completed = true WHERE id = $1 RETURNING *`,
    [user_id],
  );
  return response.rows[0];
};

module.exports = {
  userPreferencesModel,
  userLifeStyleModel,
  updateProfileCompletionStatus,
};
