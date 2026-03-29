const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 11);
};

const comparePassword = async (password, storedPasswordHash) => {
  return await bcrypt.compare(password, storedPasswordHash);
};

module.exports = { hashPassword, comparePassword };
