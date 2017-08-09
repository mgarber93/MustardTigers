const Sequelize = require('sequelize');

const database = process.env.DATABASE_URL;

const db = new Sequelize(database, {
  logging: false,
  force: true
});



module.exports = {
  Sequelize,
  db
};