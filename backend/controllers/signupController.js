const { getUserByEmail, createUser } = require("../models/userModel");
const { hashPassword } = require("./password_hash");
const verificationToken = require("../services/verificationToken");
const sendVerificationEmail = require("../services/emailService");

const signupController = async (req, res) => {
  try {
    const { password, confirmPassword, agree, ...userDetails } = req.body;

    if (password !== confirmPassword || !agree) {
      return res
        .status(400)
        .json({ message: "Password mismatch or terms not agreed" });
    }

    // if user exists already
    const existingUser = await getUserByEmail(req.email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const token = await verificationToken();
    const user = {
      ...userDetails,
      password_hash: hashPassword(password),
      verification_token: token,
      is_verified: false,
    };

    //newuser creating
    const newuser = await createUser(user);
    const { password_hash, ...safeUser } = newuser;
    // sending verification email
    await sendVerificationEmail(newuser.email, token);
    return res.status(201).json({
      message: "Verification email sent. Please check your inbox.",
      user: safeUser,
    });
  } catch (error) {
    console.error("SignUp Failed:", error);
    if (res.headersSent) {
      return;
    }
    return res.status(500).json({ error: "SignUp Failed" });
  }
};

module.exports = { signupController };
