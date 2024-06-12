const PenukaranKoin = require('../models/PenukaranKoin');
const Pengguna = require('../models/Pengguna');
const Pengepul = require('../models/Pengepul');
const NilaiTukarKoin = require('../models/NilaiTukarKoin');
const {
  verifyTransactionByPengepul
} = require('./transakasiSampahHandler');

const createPenukaranKoin = async (request, h) => {
  try {
    const {
      id_pengguna,
      id_pengepul,
      id_nilai_tukar_koin,
    } = request.payload;

    const nilaiTukar = await NilaiTukarKoin.findOne({
      where: {
        id_nilai_tukar_koin: id_nilai_tukar_koin
      }
    })


    if (!nilaiTukar) {
      return h.response({
        status: "fail",
        message: 'Nilai tukar tidak ditemukan'
      }).code(404)
    }


    const pengguna = await Pengguna.findByPk(id_pengguna);
    const jumlah_uang = nilaiTukar.nilai_uang;

    if (!pengguna || pengguna.saldo_koin < nilaiTukar.nilai_koin) {
      return h.response({
        message: 'Saldo koin tidak cukup'
      }).code(400);
    }

    // Buat entri penukaran koin
    const penukaran = await PenukaranKoin.create({
      id_pengguna,
      id_pengepul,
      id_nilai_tukar_koin,
      jumlah_uang,
      status: 'pending'
    });



    return h.response(penukaran).code(201);
  } catch (error) {
    console.error('Error during coin exchange:', error);
    return h.response({
      message: 'Terjadi kesalahan saat penukaran koin'
    }).code(500);
  }
};

const getAllPenukaranKoin = async (request, h) => {
  try {
    const penukaran = await PenukaranKoin.findAll();
    return h.response(penukaran).code(200);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const getPenukaranKoinById = async (request, h) => {
  try {
    const penukaran = await PenukaranKoin.findByPk(request.params.id);
    if (penukaran) {
      return h.response(penukaran).code(200);
    }
    return h.response({
      message: 'Penukaran Koin not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const updatePenukaranKoin = async (request, h) => {
  try {
    const penukaran = await PenukaranKoin.findByPk(request.params.id);
    if (penukaran) {
      await penukaran.update(request.payload);
      return h.response(penukaran).code(200);
    }
    return h.response({
      message: 'Penukaran Koin not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const deletePenukaranKoin = async (request, h) => {
  try {
    const penukaran = await PenukaranKoin.findByPk(request.params.id);
    if (penukaran) {
      await penukaran.destroy();
      return h.response({
        message: 'Penukaran Koin deleted'
      }).code(200);
    }
    return h.response({
      message: 'Penukaran Koin not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const verifyReedeemCoinByPengepul = async (request, h) => {
  try {
    const {
      id_penukaran
    } = request.params;

    // Temukan transaksi berdasarkan ID
    const redeem = await PenukaranKoin.findOne({
      where: {
        id_penukaran
      }
    });

    if (!redeem) {
      return h.response({
        message: 'Redeem not found'
      }).code(404);
    }

    // Periksa apakah transaksi sudah diverifikasi sebelumnya
    if (redeem.status === 'diterima') {
      return h.response({
        message: 'Redeem already verified'
      }).code(400);
    }

    // Ambil nilai tukar koin dari transaksi
    const nilaiTukar = await NilaiTukarKoin.findByPk(redeem.id_nilai_tukar_koin);

    // Verifikasi transaksi (mis. dengan mengubah status menjadi 'diterima')
    redeem.status = 'diterima';

    // Ambil keterangan dari payload
    const {
      keterangan
    } = request.payload;

    // Set keterangan jika diberikan
    if (keterangan) {
      redeem.keterangan = keterangan;
    }

    await redeem.save();

    // Kurangi saldo koin pengguna
    const pengguna = await Pengguna.findByPk(redeem.id_pengguna);
    if (!pengguna) {
      return h.response({
        message: 'User not found'
      }).code(404);
    }

    pengguna.saldo_koin -= nilaiTukar.nilai_koin;
    await pengguna.save();

    return h.response({
      message: 'Transaction verified successfully'
    }).code(200);
  } catch (error) {
    console.error('Failed to verify transaction:', error);
    return h.response({
      message: 'Failed to verify transaction'
    }).code(500);
  }
};


const getAllPenukaranKoinByPengepul = async (request, h) => {
  try {
    const {
      id_pengepul
    } = request.params;

    const penukaranByPengepul = await PenukaranKoin.findAll({
      where: {
        id_pengepul: id_pengepul
      }
    })

    if (!penukaranByPengepul) {
      h.response({
        status: false,
        message: "Data penukaran by pengepul tidak ditemukan"
      });
    }

    return h.response(penukaranByPengepul).code(200);
  } catch (e) {
    console.error('Error fetching transactions by pengepul ID:', e);
    return h.response({
      message: 'Failed to fetch transactions'
    }).code(500);
  }
}

const getAllPenukaranKoinByStatusByPengepul = async (request, h) => {
  try {
    const {
      id_pengepul
    } = request.params;

    const penukaranKoinByStatusPending = await PenukaranKoin.findAll({
      where: {
        id_pengepul,
        status: 'pending'
      }, include: [{
        model: Pengguna,
        attributes: ['nama', 'telepon']
      }, ]
    });

    if (!penukaranKoinByStatusPending || penukaranKoinByStatusPending.length === 0) {
      return h.response({
        status: false,
        message: "Penukaran koin by status pending tidak ditemukan"
      }).code(404);
    }

    return h.response({
      status: true,
      message: "Penukaran koin by status pending ditemukan",
      penukaranKoin: penukaranKoinByStatusPending
    }).code(200);
  } catch (e) {
    console.error('Error fetching transactions by status:', e);
    return h.response({
      message: 'Failed to fetch transactions'
    }).code(500);
  }
};
const getAllPenukaranKoinByStatusByPengguna = async (request, h) => {
  try {
    const {
      id_pengguna
    } = request.params;

    const penukaranKoinByStatusPending = await PenukaranKoin.findAll({
      where: {
        id_pengguna,
        status: 'pending'
      },
      include: [{
        model: Pengepul,
        attributes: ['nama', 'telepon']
      }, ]

    });

    if (!penukaranKoinByStatusPending || penukaranKoinByStatusPending.length === 0) {
      return h.response({
        status: false,
        message: "Penukaran koin by status pending tidak ditemukan"
      }).code(404);
    }

    return h.response({
      status: true,
      message: "Penukaran koin by status pending ditemukan",
      penukaranKoin: penukaranKoinByStatusPending
    }).code(200);
  } catch (e) {
    console.error('Error fetching transactions by status:', e);
    return h.response({
      message: 'Failed to fetch transactions'
    }).code(500);
  }
};

const rejectReedeemCoinByPengepul = async (request, h) => {
  try {
    const {
      id_penukaran
    } = request.params;

    // Temukan transaksi berdasarkan ID
    const transaction = await PenukaranKoin.findByPk(id_penukaran);
    if (!transaction) {
      return h.response({
        message: 'Transaction not found'
      }).code(404);
    }

    // Verifikasi transaksi (mis. dengan mengubah status menjadi 'ditolak')
    transaction.status = 'ditolak'; // Ubah status menjadi 'ditolak' setelah ditolak
    await transaction.save();

    return h.response({
      message: 'Transaction rejected successfully'
    }).code(200);
  } catch (error) {
    return h.response({
      message: 'Failed to reject transaction'
    }).code(500);
  }
};

const getALlRiwayatTukarKoinByIdPengguna = async (request, h) => {
  try {
    const {
      id_pengguna
    } = request.params;

    const riwayatTransaksi = await PenukaranKoin.findAll({
      where: {
        id_pengguna: id_pengguna,
        status: ['diterima', 'ditolak'] // Ubah kondisi status menjadi array
      },
      include: [{
        model: Pengepul,
        attributes: ['nama']
      }, ]
    });

    if (!riwayatTransaksi || riwayatTransaksi.length === 0) { // Periksa apakah riwayatTransaksi tidak ditemukan atau kosong
      return h.response({
        status: 'error',
        message: "Data riwayat transaksi by id Pengguna tidak ditemukan",
      }).code(404);
    }


    return h.response({
      status: 'success',
      message: 'Data riwayat transaksi by id pengguna berhasil ditemukan',
      data: riwayatTransaksi
    }).code(200);
  } catch (err) {
    console.error('Error fetching transaction history:', err);
    return h.response(err).code(500);
  }
}
const getALlRiwayatTukarKoinByIdPengepul = async (request, h) => {
  try {
    const {
      id_pengepul
    } = request.params;

    const riwayatTransaksi = await PenukaranKoin.findAll({
      where: {
        id_pengepul: id_pengepul,
        status: ['diterima', 'ditolak'] // Ubah kondisi status menjadi array
      },
      include: [{
        model: Pengguna,
        attributes: ['nama', 'telepon']
      }, ]
    });

    if (!riwayatTransaksi || riwayatTransaksi.length === 0) { // Periksa apakah riwayatTransaksi tidak ditemukan atau kosong
      return h.response({
        status: 'error',
        message: "Data riwayat transaksi by id Pengguna tidak ditemukan",
      }).code(404);
    }


    return h.response({
      status: 'success',
      message: 'Data riwayat transaksi by id pengguna berhasil ditemukan',
      data: riwayatTransaksi
    }).code(200);
  } catch (err) {
    console.error('Error fetching transaction history:', err);
    return h.response(err).code(500);
  }
}

module.exports = {
  createPenukaranKoin,
  getAllPenukaranKoin,
  getPenukaranKoinById,
  updatePenukaranKoin,
  deletePenukaranKoin,
  getAllPenukaranKoinByPengepul,
  verifyReedeemCoinByPengepul,
  rejectReedeemCoinByPengepul,
  getAllPenukaranKoinByStatusByPengepul,
  getAllPenukaranKoinByStatusByPengguna,
  getALlRiwayatTukarKoinByIdPengguna,
  getALlRiwayatTukarKoinByIdPengepul
};