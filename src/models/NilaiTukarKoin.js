const {
  DataTypes
} = require('sequelize');
const sequelize = require('../config/sequelize');

const NilaiTukarKoin = sequelize.define('nilai_tukar_koin', {
  id_nilai_tukar_koin: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nilai_koin: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nilai_uang: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
});

module.exports = NilaiTukarKoin;