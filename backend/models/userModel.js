const pool = require("../config/db");
// creating new user
const createUser = async (userData) => {
  const {
    fullName,
    email,
    password_hash,
    age,
    city,
    college,
    clg_year,
    course,
    verification_token,
    is_verified,
  } = userData;

  const result = await pool.query(
    `INSERT INTO users (full_name, email, password_hash, college, city, age, clg_year, course , verification_token , is_verified) VALUES($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10) RETURNING *`,
    [
      fullName,
      email,
      password_hash,
      college,
      city,
      age,
      clg_year,
      course,
      verification_token,
      is_verified,
    ],
  );

  return result.rows[0];
};

// ends

// check if user exists by email

const getUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return result.rows[0];
};
//ends

const updateVerificationToken = async (email, verificationToken) => {
  const result = await pool.query(
    `UPDATE users SET verification_token = $1 WHERE email = $2 RETURNING *`,
    [verificationToken, email],
  );

  return result.rows[0];
};

module.exports = { createUser, getUserByEmail, updateVerificationToken };
