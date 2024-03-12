const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(
  'test',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
    pool: {},
  }
);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

module.exports = {
  db: sequelize
};