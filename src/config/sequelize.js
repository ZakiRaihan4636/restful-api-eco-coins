const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bank_sampah', 'root', 'Admin@123456789', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;

