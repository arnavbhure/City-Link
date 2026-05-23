import api from "../axios";

const createVendorListing = async (payload) => {
  try {
    const response = await api.post("/vendors", payload);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message || "Failed to create vendor listing",
      errors: error?.response?.data?.errors || [],
    };
  }
};

export default createVendorListing;
