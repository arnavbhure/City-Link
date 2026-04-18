const pool = require("../config/db");

const PostHouseListingModel = async (data) => {
  const {
    owner_id,
    title,
    propertyType,
    city,
    locality,
    rent,
    deposit,
    availableFrom,
    sharingType,
    description,
    houseRules,
    furnished,
    wifi,
    meals,
    attachedWashroom,
    laundry,
    powerBackup,
  } = data;
  const result = await pool.query(
    `INSERT INTO listings (owner_id , title,
    propertytype,
    city,
    locality,
    rent,
    deposit,
    availablefrom,
    sharingtype,
    description,
    houserules,
    furnished,
    wifi,
    meals,
    attachedwashroom,
    laundry,
    powerbackup) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16 ,$17) RETURNING *`,
    [
      owner_id,
      title,
      propertyType,
      city,
      locality,
      rent,
      deposit,
      availableFrom,
      sharingType,
      description,
      houseRules,
      furnished,
      wifi,
      meals,
      attachedWashroom,
      laundry,
      powerBackup,
    ],
  );
  return result.rows[0];
};

module.exports = PostHouseListingModel;
