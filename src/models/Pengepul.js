const {
  DataTypes
} = require('sequelize');
const sequelize = require('../config/sequelize');

const Pengepul = sequelize.define('Pengepul', {
  id_pengepul: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telepon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'pengepul',
});

module.exports = Pengepul;
