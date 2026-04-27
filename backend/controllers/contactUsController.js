const { sendEmail } = require("../services/EmailServices");

const contactUsController = async (req, res) => {
  const { email, fullName, message, topic } = req.body;
  try {
    if (!email || !fullName || !message || !topic) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const response = await sendEmail({
      to: process.env.SUPPORT_EMAIL,
      subject: `New Contact Us Message: ${topic}`,
      text: `You have received a new message from ${fullName} (${email}):\n\n${message}`,
      html: `
      <br>
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: white; padding: 25px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          <h1 style="color: #7C86FF; margin: 0; font-size: 28px;">CityLink Support</h1>
            <p style="color: #94a3b8; margin-top: 6px;">Trusted student housing starts here</p>
            <h2 style="color: #2c3e50; margin-bottom: 10px;">New Contact Us Message</h2>
            <p style="color: #555; font-size: 15px;"><strong>${fullName}</strong> (${email}) has sent a message regarding <strong>${topic}</strong>.</p>
            <p style="color: #777; font-size: 14px;">Message:</p>
            <p style="color: #777; font-size: 14px; white-space: pre-wrap;">${message}</p>
        </div>
         </div>`,
    });
    if (response) {
      return res.status(200).json({
        success: true,
        message:
          "Your message has been sent successfully. We will get back to you shortly.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "An error occurred while sending your message. Please try again later.",
    });
  } catch (err) {
    console.log("Error in contactUsController:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};

module.exports = contactUsController;
