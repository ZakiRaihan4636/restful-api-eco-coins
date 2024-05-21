const {
  DataTypes
} = require('sequelize');

const sequelize = require('../config/sequelize');

const Transaksi = sequelize.define('transaksi', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tanggal_transaksi: {
    type: DataTypes.DATE,
  },
  jumlah_kg: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'valid', 'rejected'),
    allowNull: false,
  },

});

Transaksi.associate = (models) => {
  Transaksi.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
};

module.exports = Transaksi;
