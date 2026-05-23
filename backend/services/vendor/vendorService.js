const { getCategoryDetailFields } = require("./vendorCategoryConfig");

const cleanString = (value) => (typeof value === "string" ? value.trim() : "");

const sanitizeCategoryDetails = (category, details = {}) => {
  const allowedFields = getCategoryDetailFields(category);
  if (!details || typeof details !== "object" || Array.isArray(details)) {
    return {};
  }

  return allowedFields.reduce((acc, field) => {
    const rawValue = details[field];
    if (rawValue === undefined || rawValue === null) {
      return acc;
    }

    if (Array.isArray(rawValue)) {
      const cleaned = rawValue
        .map((item) => cleanString(String(item)))
        .filter(Boolean);
      if (cleaned.length) {
        acc[field] = cleaned;
      }
      return acc;
    }

    const cleanedValue = cleanString(String(rawValue));
    if (cleanedValue) {
      acc[field] = cleanedValue;
    }

    return acc;
  }, {});
};

const normalizePhotos = (photos) => {
  if (!Array.isArray(photos)) {
    return [];
  }

  return photos
    .map((photo) => {
      if (typeof photo === "string") {
        return cleanString(photo);
      }
      if (photo && typeof photo.name === "string") {
        return cleanString(photo.name);
      }
      return "";
    })
    .filter(Boolean);
};

const normalizeVendorPayload = (payload) => {
  const category = cleanString(payload.category);
  const businessName = cleanString(payload.business_name);
  const ownerName = cleanString(payload.owner_name);
  const phone = cleanString(payload.phone);
  const whatsapp = cleanString(payload.whatsapp || payload.phone);
  const city = cleanString(payload.city);
  const area = cleanString(payload.area);
  const description = cleanString(payload.description);
  const verifiedPhone = cleanString(payload.verified_phone);
  const categoryDetails = sanitizeCategoryDetails(
    category,
    payload.category_details || {},
  );

  return {
    category,
    business_name: businessName,
    owner_name: ownerName,
    phone,
    whatsapp: whatsapp || null,
    city,
    area,
    description: description || null,
    verified_phone: verifiedPhone,
    photos: normalizePhotos(payload.photos),
    category_details: categoryDetails,
    is_verified: Boolean(payload.is_verified),
    is_active:
      typeof payload.is_active === "boolean" ? payload.is_active : true,
  };
};

const buildVendorListOptions = ({ query, params }) => {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const limit = Math.min(
    50,
    Math.max(1, Number.parseInt(query.limit, 10) || 12),
  );
  const sortBy = cleanString(query.sortBy) || "created_at";
  const order =
    cleanString(query.order).toLowerCase() === "asc" ? "asc" : "desc";

  return {
    filters: {
      category: cleanString(params.category || query.category),
      city: cleanString(params.city || query.city),
      area: cleanString(query.area),
      search: cleanString(query.search),
      is_verified: cleanString(query.is_verified),
      is_active: cleanString(query.is_active),
    },
    pagination: {
      page,
      limit,
    },
    sort: {
      sortBy,
      order,
    },
  };
};

module.exports = {
  buildVendorListOptions,
  normalizeVendorPayload,
  sanitizeCategoryDetails,
};
