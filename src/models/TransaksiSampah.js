const {
  DataTypes
} = require('sequelize');
const sequelize = require('../config/sequelize');
const Pengguna = require('./Pengguna');
const Sampah = require('./Sampah');
const Pengepul = require('./Pengepul');

const TransaksiSampah = sequelize.define('TransaksiSampah', {
  id_transaksi: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_pengguna: {
    type: DataTypes.INTEGER,
    references: {
      model: Pengguna,
      key: 'id_pengguna',
    },
  },
  id_sampah: {
    type: DataTypes.INTEGER,
    references: {
      model: Sampah,
      key: 'id_sampah',
    },
  },
  id_pengepul: {
    type: DataTypes.INTEGER,
    references: {
      model: Pengepul,
      key: 'id_pengepul',
    },
  },
  berat_kg: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  jumlah_koin: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'diterima', 'ditolak'), // Tambahkan kolom status dengan nilai "pending" atau "verified"
    allowNull: false,
    defaultValue: 'pending' // Nilai default status adalah "pending"
  }
}, {
  timestamps: false,
  tableName: 'transaksi_sampah',
});

TransaksiSampah.belongsTo(Pengguna, {
  foreignKey: 'id_pengguna'
});
TransaksiSampah.belongsTo(Sampah, {
  foreignKey: 'id_sampah'
});
TransaksiSampah.belongsTo(Pengepul, {
  foreignKey: 'id_pengepul'
});

module.exports = TransaksiSampah;
