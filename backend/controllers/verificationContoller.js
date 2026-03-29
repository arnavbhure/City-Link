const verficationModel = require("../models/verificationModel");

const verificationController = async (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ message: "Verification token is required" });
  }
  try {
    const response = await verficationModel(token);
    if (response) {
      return res.redirect(`${process.env.FRONTEND_URL}/login`);
    }
  } catch (error) {
    return res.status(500).json({ message: "Email verification failed" });
  }
};

module.exports = verificationController;
