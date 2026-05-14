const pool = require("../../config/db");

const editProfileModel = async (userId, data) => {
  const client = await pool.connect();

  try {
    const {
      college,
      clg_year,
      course,
      city,

      budget_min,
      budget_max,
      food_preference,
      smoking_preference,
      wants_shared_chores,
      preferred_gender,

      cleanliness_level,
      sleep_schedule,
      bio,
      lifestyle_type,
    } = data;

    await client.query("BEGIN");

    const usersResult = await client.query(
      `
      UPDATE users
      SET
        college = $1,
        course = $2,
        clg_year = $3,
        city = $4
      WHERE id = $5
      `,
      [college, course, clg_year, city, userId],
    );

    if (usersResult.rowCount === 0) {
      throw new Error("User not found");
    }

    const preferencesResult = await client.query(
      `
      UPDATE user_preferences
      SET
        budget_min = $1,
        budget_max = $2,
        food_preference = $3,
        smoking_preference = $4,
        wants_shared_chores = $5,
        preferred_gender = $6
      WHERE user_id = $7
      `,
      [
        budget_min,
        budget_max,
        food_preference,
        smoking_preference,
        wants_shared_chores,
        preferred_gender,
        userId,
      ],
    );

    if (preferencesResult.rowCount === 0) {
      throw new Error("User preferences row not found");
    }

    const lifestyleResult = await client.query(
      `
      UPDATE user_lifestyle
      SET
        cleanliness_level = $1,
        sleep_schedule = $2,
        bio = $3,
        lifestyle_type = $4
      WHERE user_id = $5
      `,
      [cleanliness_level, sleep_schedule, bio, lifestyle_type, userId],
    );

    if (lifestyleResult.rowCount === 0) {
      throw new Error("User lifestyle row not found");
    }

    await client.query("COMMIT");

    return {
      success: true,
    };
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Error in editProfileModel:", error);

    return {
      success: false,
      message: error.message,
    };
  } finally {
    client.release();
  }
};

module.exports = editProfileModel;
