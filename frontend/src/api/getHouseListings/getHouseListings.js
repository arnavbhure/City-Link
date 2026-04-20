import api from "../axios";

const getHouseListings = async (city) => {
  try {
    const response = await api.get("/get-house-listings", { params: { city } });
    return response.data;
  } catch {
    return { success: false, message: "Failed to fetch house listings" };
  }
};

export default getHouseListings;
