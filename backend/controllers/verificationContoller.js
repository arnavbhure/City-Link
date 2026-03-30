const verficationModel = require("../models/verificationModel");

const verificationController = async (req, res) => {
  const { token } = req.query;
  const frontendLoginUrl = `${process.env.FRONTEND_URL}/login`;
  if (!token) {
    return res.status(400).json({ message: "Verification token is required" });
  }
  try {
    const response = await verficationModel(token);
    if (response) {
      return res.redirect(`${frontendLoginUrl}?verification=success`);
    }
    return res.redirect(`${frontendLoginUrl}?verification=invalid`);
  } catch (error) {
    return res.redirect(`${frontendLoginUrl}?verification=error`);
  }
};

module.exports = verificationController;
