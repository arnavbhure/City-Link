const crypto = require("crypto");

const verificationToken = async () => {
  return crypto.randomBytes(32).toString("hex"); // token for verifiaction of email
};

module.exports = verificationToken;
