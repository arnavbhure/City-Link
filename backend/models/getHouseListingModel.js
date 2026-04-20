const pool = require("../config/db");

const getHouseListingModel = async (city) => {
  const response = await pool.query(
    `
  SELECT * 
  FROM listings 
  WHERE LOWER(city) = LOWER($1)
`,
    [city],
  );
  return response.rows;
};

module.exports = getHouseListingModel;
