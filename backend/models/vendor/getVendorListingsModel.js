const pool = require("../../config/db");

const SORT_FIELDS = new Set([
  "created_at",
  "updated_at",
  "business_name",
  "city",
]);

const buildFilterQuery = (filters) => {
  const conditions = [];
  const values = [];

  if (filters.category) {
    values.push(filters.category);
    conditions.push(`category = $${values.length}`);
  }

  if (filters.city) {
    values.push(filters.city);
    conditions.push(`city ILIKE $${values.length}`);
  }

  if (filters.area) {
    values.push(`%${filters.area}%`);
    conditions.push(`area ILIKE $${values.length}`);
  }

  if (filters.search) {
    values.push(`%${filters.search}%`);
    conditions.push(
      `(business_name ILIKE $${values.length} OR description ILIKE $${values.length})`,
    );
  }

  if (filters.is_verified === "true" || filters.is_verified === true) {
    conditions.push("is_verified = true");
  }

  if (filters.is_verified === "false") {
    conditions.push("is_verified = false");
  }

  if (filters.is_active === "false") {
    conditions.push("is_active = false");
  }

  if (filters.is_active === "true" || filters.is_active === true) {
    conditions.push("is_active = true");
  }

  if (!filters.is_active) {
    conditions.push("is_active = true");
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";
  return { whereClause, values };
};

const getVendorListingsModel = async ({ filters, pagination, sort }) => {
  const { whereClause, values } = buildFilterQuery(filters);
  const sortField = SORT_FIELDS.has(sort.sortBy) ? sort.sortBy : "created_at";
  const sortOrder = sort.order === "asc" ? "ASC" : "DESC";
  const limit = pagination.limit;
  const offset = (pagination.page - 1) * limit;

  const countResult = await pool.query(
    `SELECT COUNT(*) FROM vendor_listings ${whereClause}`,
    values,
  );

  const listResult = await pool.query(
    `SELECT * FROM vendor_listings ${whereClause}
     ORDER BY ${sortField} ${sortOrder}
     LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
    [...values, limit, offset],
  );

  return {
    rows: listResult.rows,
    total: Number(countResult.rows[0].count),
  };
};

module.exports = getVendorListingsModel;
