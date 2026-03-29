const signup = async (req, res) => {
  console.log("Signup request");
  try {
    const { fullName, email, password_hash, college, year, city } = req.body;
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
};
