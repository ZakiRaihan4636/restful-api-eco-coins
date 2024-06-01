const {
  DataTypes
} = require('sequelize');
const sequelize = require('../config/sequelize');

const Pengguna = sequelize.define('Pengguna', {
  id_pengguna: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telepon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  saldo_koin: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  
}, {
  timestamps: false,
  tableName: 'pengguna',
});

module.exports = Pengguna;
