const Sequelize = require('sequelize');

const database = process.env.DATABASE_URL;

if (!database) {
  throw new Error(`
  $DATABASE_URL is not defined in your environment!
  This is required in order to connect to MySQL and should have the format:
  mysql://username:password@hostname/database
  where :password is optional for no password.

  If running from the command line, you would need to type something like:
  export DATABASE_URL=mysql://root@localhost/test
  in the terminal before starting the server.

  If running from VS Code, you need to add:
  "env": {
    "DATABASE_URL": "mysql://root@localhost/test"
  }
  as a parameter to your configurations.

  If running anything else, look up how to add environment variables.

  These environment variables should already be defined for the Travis
  and Heroku scripts.
  `);
}

const options = {};

if (!process.env.SQL_LOGGING) {
  options.logging = false;
}

const db = new Sequelize(database, options);

module.exports = {
  Sequelize,
  db
};