import api from "../axios";

const updateOpenForListing = async (openForListing) => {
  try {
    const response = await api.patch("/auth/open-for-listing", {
      open_for_listing: openForListing,
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "We could not update your listing preference",
    };
  }
};

export default updateOpenForListing;
