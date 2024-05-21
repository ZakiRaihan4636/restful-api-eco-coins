const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bank_sampah', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;

