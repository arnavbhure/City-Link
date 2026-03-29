const { Pool } = require("pg");
require("dotenv").config();

const user = process.env.DB_USER;
const host = process.env.HOST;
const database = process.env.DATABASE;
const password = process.env.PASSWORD;
const port = process.env.DB_PORT;

const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
});

module.exports = pool;
