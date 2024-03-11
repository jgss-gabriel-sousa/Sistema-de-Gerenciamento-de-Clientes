const pgp = require("pg-promise")();
const { join } = require("node:path");

const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const database = process.env.DB_NAME;

const db = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`);

const filePath = join(__dirname, "create-table.sql");
const query = new pgp.QueryFile(filePath);
db.query(query);

module.exports = db;