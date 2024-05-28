const {
  DataTypes
} = require('sequelize');
const sequelize = require('../config/sequelize');
const Pengguna = require('./Pengguna');
const Pengepul = require('./Pengepul');
const NilaiTukarKoin = require('./NilaiTukarKoin');

const PenukaranKoin = sequelize.define('PenukaranKoin', {
  id_penukaran: {
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
  id_pengepul: {
    type: DataTypes.INTEGER,
    references: {
      model: Pengepul,
      key: 'id_pengepul',
    },
  },
  id_nilai_tukar_koin: {
    type: DataTypes.INTEGER,
    references: {
      model: NilaiTukarKoin,
      key: 'id_nilai_tukar_koin',
    },
  },
  jumlah_uang: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM('pending', 'diterima', 'ditolak'), // Tambahkan kolom status dengan nilai "pending" atau "verified"
    allowNull: false,
  },
  keterangan: {
    type: DataTypes.TEXT, // Tambahkan kolom status dengan nilai "pending" atau "verified"
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: 'penukaran_koin',
});

PenukaranKoin.belongsTo(Pengguna, {
  foreignKey: 'id_pengguna'
});
PenukaranKoin.belongsTo(Pengepul, {
  foreignKey: 'id_pengepul'
});

module.exports = PenukaranKoin;
