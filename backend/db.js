// db.js
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "", // add password if any
  database: "pma_sample"
});

db.connect(err => {
  if (err) console.error("DB connection failed:", err);
  else console.log("✅ MySQL connected");
});

module.exports = db;