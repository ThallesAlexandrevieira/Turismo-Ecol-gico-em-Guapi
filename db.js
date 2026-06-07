const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",        // seu usuário MySQL
  password: "senha123", // sua senha MySQL
  database: "turismo"
});

module.exports = pool;
