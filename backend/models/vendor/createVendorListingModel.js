const pool = require("../../config/db");

const createVendorListingModel = async (data) => {
  const result = await pool.query(
    `
    INSERT INTO vendor_listings (
      category,
      business_name,
      owner_name,
      phone,
      whatsapp,
      city,
      area,
      description,
      verified_phone,
      photos,
      category_details,
      is_verified,
      is_active
    )
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7,
      $8,
      $9,
      $10,
      $11,
      $12,
      $13
    )
    RETURNING *
    `,
    [
      data.category,

      data.business_name?.trim(),

      data.owner_name?.trim(),

      data.phone?.trim(),

      data.whatsapp?.trim(),

      data.city?.trim().toLowerCase(),

      data.area?.trim().toLowerCase(),

      data.description?.trim(),

      data.verified_phone?.trim(),

      data.photos || [],

      data.category_details || {},

      data.is_verified ?? false,

      data.is_active ?? true,
    ],
  );

  return result.rows[0];
};

module.exports = createVendorListingModel;
