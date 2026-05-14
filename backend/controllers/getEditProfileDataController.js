const getViewProfileModel = require("../models/getViewProfileModel");

const getEditProfileDataController = async (req, res) => {
  try {
    const id = req.user.id;
    const response = await getViewProfileModel(id);
    if (!response) {
      return res
        .status(500)
        .json({ success: false, message: "Error in fetching profile data ." });
    }
    return res.json({ success: true, data: response });
  } catch (err) {
    console.log(
      "Error in getting user profile data for edit profile section . ",
      err,
    );
    return res
      .status(500)
      .json({ success: false, message: "Error in fetching profile data ." });
  }
};

module.exports = getEditProfileDataController;
