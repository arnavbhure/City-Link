const { sendNotificationModel } = require("../models/userModel");
const { sendEmail } = require("../services/EmailServices");
const validator = require("validator");

const sendNotificationToRoommateController = async (req, res) => {
  try {
    const FRONTEND_URL = process.env.FRONTEND_URL;
    const receiverId = req.body.profileId; // which recives email
    const senderName = req.body.senderName;
    const senderMail = req.body.email;
    const senderId = req.body.user_id; // which sends email

    if (!senderId || !senderName || !senderMail || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }
    if (!validator.isEmail(senderMail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sender email.",
      });
    }

    const receiver = await sendNotificationModel(receiverId);

    if (!receiver || !receiver.email) {
      return res.status(404).json({
        success: false,
        message: "Receiver not found.",
      });
    }

    const receiverMail = receiver.email;
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
      <div style="max-width: 500px; margin: auto; background: white; padding: 25px; border-radius: 10px;">
        
        <div style="text-align: center; padding-bottom: 20px;">
          <h1 style="color: #7C86FF;">CityLink</h1>
          <p style="color: #94a3b8;">Trusted student housing starts here</p>
        </div>

        <h2>New Roommate Request 👋</h2>

        <p><strong>${senderName}</strong> wants to connect with you.</p>

        <div style="text-align: center; margin: 20px 0;">
          <a href="mailto:${senderMail}" target="_blank"
            style="display:block; margin:10px auto; width:200px; background:#4f46e5; color:white; padding:12px; text-decoration:none; border-radius:6px;">
            Contact via Email
          </a>

          <a href="${FRONTEND_URL}/view-profile/${senderId}" target="_blank"
            style="display:block; margin:10px auto; width:200px; background:#4f46e5; color:white; padding:12px; text-decoration:none; border-radius:6px;">
            View Profile
          </a>
        </div>

        <p style="font-size:12px; color:#999; text-align:center;">
          Someone showed interest in connecting with you on CityLink.
        </p>

      </div>
    </div>
    `;

    const textContent = `${senderName} wants to connect with you on CityLink. Contact: ${senderMail}`;

    const emailSent = await sendEmail({
      to: receiverMail,
      subject: "New Roommate Request on CityLink",
      html: htmlContent,
      text: textContent,
    });

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send email.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification sent successfully.",
    });
  } catch (err) {
    console.log("Error in sendNotificationToRoommateController:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = sendNotificationToRoommateController;
