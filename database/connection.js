const Sequelize = require('sequelize');

const database = process.env.DATABASE_URL;

const db = new Sequelize(database);

module.exports = {
  Sequelize,
  db
};