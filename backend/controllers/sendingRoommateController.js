const gettingsendingRoommateController = async (req, res) => {
  const { city, user_id } = req.body;
  if (!user_id) {
    return res.status(500).json({ success: false });
  }
  const response = await getRoommateThroughCity(city);
};

module.exports = gettingsendingRoommateController;
