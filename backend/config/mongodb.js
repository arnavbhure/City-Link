const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

module.exports = { connectDB };
