const { getUserById } = require("../models/userModel");
const { sendEmail } = require("../services/EmailServices");

const sendNotificationToRoommateControlller = async (req, res) => {
  try {
    console.log("Received request to send notification:", req.body);
    const FRONTEND_URL = process.env.FRONTEND_URL;
    const recieverId = req.body.profileId; // user which receive the notification
    const senderMail = req.body.email;
    const senderName = req.body.senderName;
    const user_id = req.body.user_id; // user which send the notification
    const reciever = await getUserById(recieverId);
    if (!reciever || !senderMail) {
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong." });
    }
    const recieverMail = reciever.email;
    const emailResponse = await sendEmail({
      to: recieverMail,
      subject: "New Roommate Request on CityLink",
      text: "",
      html: `
 <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
  
  <div style="max-width: 500px; margin: auto; background: white; padding: 25px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
    
    <!-- HEADER (fixed, no <tr>) -->
    <div style="text-align: center; padding-bottom: 20px;">
      <h1 style="color: #7C86FF; margin: 0; font-size: 28px;">
        CityLink
      </h1>
      <p style="color: #94a3b8; margin-top: 6px;">
        Trusted student housing starts here
      </p>
    </div>

    <h2 style="color: #2c3e50; margin-bottom: 10px;">
      New Roommate Request 👋
    </h2>

    <p style="color: #555; font-size: 15px;">
      <strong>${senderName}</strong> wants to connect with you on <strong>CityLink</strong>.
    </p>

    <p style="color: #777; font-size: 14px;">
      Check their profile and decide if you'd like to connect.
    </p>

    <div style="text-align: center; margin: 25px 0;">
      <p style="color: #777; font-size: 14px;">
        Send email to them if you are interested in connecting with them.
      </p>

      <a href="mailto:${senderMail}"
        style="display: block; width: 200px; margin: 10px auto; background-color: #4f46e5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px;">
        Send Email
      </a>

      <a href="${FRONTEND_URL}/view-profile/${user_id}"
        style="display: block; width: 200px; margin: 10px auto; background-color: #4f46e5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px;">
        View Profile
      </a>
    </div>

    <hr style="border: none; border-top: 1px solid #eee;" />

    <p style="font-size: 12px; color: #999; text-align: center;">
      You're receiving this because someone showed interest in connecting with you on CityLink.
    </p>

    <p style="font-size: 12px; color: #bbb; text-align: center;">
      – Team CityLink
    </p>

  </div>
</div>
`,
    });

    if (emailResponse) {
      return res.status(200).json({
        success: true,
        message: "Notification sent successfully.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to send notification. Please try again later.",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid request.",
    });
  }
};

module.exports = sendNotificationToRoommateControlller;
