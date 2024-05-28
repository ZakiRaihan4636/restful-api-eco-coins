const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Sampah = sequelize.define('Sampah', {
  id_sampah: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  jenis_sampah: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nilai_koin_per_kg: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'sampah',
});

module.exports = Sampah;
