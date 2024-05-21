const { DataTypes } = require('sequelize');

const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nama_lengkap: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

User.associate = (models) => {
  User.hasMany(models.Transaksi, {
    foreignKey: 'user_id',
    as: 'transaksi'
  });
};

module.exports = User;
