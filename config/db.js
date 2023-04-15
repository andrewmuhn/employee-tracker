require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  console.log("Connect to the database")
);

module.exports = db;
