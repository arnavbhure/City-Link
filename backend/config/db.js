require("dotenv").config();
const { Pool } = require("pg");

const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
