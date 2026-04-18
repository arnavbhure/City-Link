import api from "../axios";

const PostingHouseListing = async ({ formData, owner_id }) => {
  try {
    const data = { owner_id, ...formData };
    const response = await api.post("/posting-house-listing", data);
    if (response) {
      return response.data;
    }
    return { success: false, message: "Failed to post the listing." };
  } catch (err) {
    return {
      success: false,
      message: err.response.data.message || "Failed to post the listing.",
    };
  }
};

export default PostingHouseListing;
