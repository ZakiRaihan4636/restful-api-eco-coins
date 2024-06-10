const TransaksiSampah = require('../models/TransaksiSampah');
const Pengguna = require('../models/Pengguna');
const Sampah = require('../models/Sampah');
const Pengepul = require('../models/Pengepul');

const createTransaksiSampah = async (request, h) => {
  try {
    const {
      id_pengguna,
      id_sampah,
      id_pengepul,
      berat_kg
    } = request.payload;

    // Pastikan payload memiliki semua properti yang diperlukan
    if (!id_pengguna || !id_sampah || !id_pengepul || !berat_kg) {
      return h.response({
        message: 'Missing required data'
      }).code(400);
    }

    const sampah = await Sampah.findByPk(id_sampah);
    if (!sampah) {
      return h.response({
        message: 'Sampah not found'
      }).code(404);
    }

    // Hitung jumlah koin berdasarkan berat sampah dan nilai koin per kilogramnya
    const jumlah_koin = sampah.nilai_koin_per_kg * berat_kg;

    // Buat transaksi baru dengan status 'pending'
    const transaksi = await TransaksiSampah.create({
      id_pengguna,
      id_sampah,
      id_pengepul,
      berat_kg,
      jumlah_koin,
      status: 'pending'
    });

    return h.response(transaksi).code(201);
  } catch (err) {
    console.error('Error creating transaction:', err);
    return h.response({
      message: 'Internal Server Error'
    }).code(500);
  }
};

const getALlRiwayatTraksaksiByIdPengguna = async (request, h) => {
  try {
    const {
      id_pengguna
    } = request.params;

    const riwayatTransaksi = await TransaksiSampah.findAll({
      include: [{
          model: Pengguna
        },
        {
          model: Sampah
        },
        {
          model: Pengepul
        }
      ],
      where: {
        id_pengguna: id_pengguna,
        status: ['diterima', 'ditolak'] // Ubah kondisi status menjadi array
      },
    });

    if (!riwayatTransaksi || riwayatTransaksi.length === 0) { // Periksa apakah riwayatTransaksi tidak ditemukan atau kosong
      return h.response({
        status: 'error',
        message: "Data riwayat transaksi by id Pengguna tidak ditemukan",
      }).code(404);
    }

    const formatedRiwayatTransaksi = riwayatTransaksi.map(item => {
      return {
        id_transaksi: item.id_transaksi,
        id_pengguna: item.id_pengguna,
        id_sampah: item.id_sampah,
        nama_pengguna: item.Pengguna.nama, // Mengambil nama pengguna dari relasi
        nama_pengepul: item.Pengepul.nama, // Mengambil nama pengguna dari relasi
        jenis_sampah: item.Sampah.jenis_sampah, // Mengambil nama jenis sampah dari relasi
        berat_kg: item.berat_kg,
        nilai_koin_per_kg: item.Sampah.nilai_koin_per_kg,
        jumlah_koin: item.jumlah_koin,
        alamat: item.Pengguna.alamat,
        tanggal: item.tanggal,
        status: item.status
      }
    })

    return h.response({
      status: 'success',
      message: 'Data riwayat transaksi by id pengguna berhasil ditemukan',
      riwayat: formatedRiwayatTransaksi
    }).code(200);
  } catch (err) {
    console.error('Error fetching transaction history:', err);
    return h.response(err).code(500);
  }
}
const getALlRiwayatTraksaksiByIdPengepul = async (request, h) => {
  try {
    const {
      id_pengepul
    } = request.params;

    const riwayatTransaksi = await TransaksiSampah.findAll({
      include: [{
          model: Pengguna
        },
        {
          model: Sampah
        },
        {
          model: Pengepul
        }
      ],
      where: {
        id_pengepul: id_pengepul,
        status: ['diterima', 'ditolak'] // Ubah kondisi status menjadi array
      },
    });

    if (!riwayatTransaksi || riwayatTransaksi.length === 0) { // Periksa apakah riwayatTransaksi tidak ditemukan atau kosong
      return h.response({
        status: 'error',
        message: "Data riwayat transaksi by id Pengguna tidak ditemukan",
      }).code(404);
    }

    const formatedRiwayatTransaksi = riwayatTransaksi.map(item => {
      return {
        id_transaksi: item.id_transaksi,
        id_pengguna: item.id_pengguna,
        id_sampah: item.id_sampah,
        nama_pengguna: item.Pengguna.nama, // Mengambil nama pengguna dari relasi
        nama_pengepul: item.Pengepul.nama, // Mengambil nama pengguna dari relasi
        jenis_sampah: item.Sampah.jenis_sampah, // Mengambil nama jenis sampah dari relasi
        berat_kg: item.berat_kg,
        nilai_koin_per_kg: item.Sampah.nilai_koin_per_kg,
        jumlah_koin: item.jumlah_koin,
        alamat: item.Pengguna.alamat,
        tanggal: item.tanggal,
        status: item.status
      }
    })

    return h.response({
      status: 'success',
      message: 'Data riwayat transaksi by id pengguna berhasil ditemukan',
      riwayat: formatedRiwayatTransaksi
    }).code(200);
  } catch (err) {
    console.error('Error fetching transaction history:', err);
    return h.response(err).code(500);
  }
}


const getAllTransaksiSampah = async (request, h) => {
  try {
    const transaksi = await TransaksiSampah.findAll({
      include: [{
          model: Pengguna
        },
        {
          model: Sampah
        },
        {
          model: Pengepul
        }
      ]
    });

    // Ubah format respons sesuai kebutuhan
    const formattedTransaksi = transaksi.map(item => {
      return {
        id_transaksi: item.id_transaksi,
        id_pengguna: item.id_pengguna,
        id_sampah: item.id_sampah,
        berat_kg: item.berat_kg,
        nilai_koin_per_kg: item.Sampah.nilai_koin_per_kg,
        jumlah_koin: item.jumlah_koin,
        nama_pengguna: item.Pengguna.nama, // Mengambil nama pengguna dari relasi
        nama_pengepul: item.Pengepul.nama, // Mengambil nama pengguna dari relasi
        jenis_sampah: item.Sampah.jenis_sampah, // Mengambil nama jenis sampah dari relasi
        alamat: item.Pengguna.alamat,
        tanggal: item.tanggal,
        status: item.status
      };
    });
    return h.response(formattedTransaksi).code(200);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const verifyTransactionByPengepul = async (request, h) => {
  try {
    const {
      id_transaksi
    } = request.params;

    // Temukan transaksi berdasarkan ID
    const transaction = await TransaksiSampah.findByPk(id_transaksi);
    if (!transaction) {
      return h.response({
        message: 'Transaction not found'
      }).code(404);
    }

    // Periksa apakah transaksi sudah diverifikasi sebelumnya
    if (transaction.status === 'diterima') {
      return h.response({
        message: 'Transaction already verified'
      }).code(400);
    }

    // Verifikasi transaksi (mis. dengan mengubah status menjadi 'diterima')
    transaction.status = 'diterima';
    await transaction.save();

    // Lakukan penambahan saldo koin hanya jika transaksi diverifikasi
    await Pengguna.increment('saldo_koin', {
      by: transaction.jumlah_koin,
      where: {
        id_pengguna: transaction.id_pengguna
      }
    });

    return h.response({
      message: 'Transaction verified successfully'
    }).code(200);
  } catch (error) {
    return h.response({
      message: 'Failed to verify transaction'
    }).code(500);
  }
};



const rejectTransactionByPengepul = async (request, h) => {
  try {
    const {
      id_transaksi
    } = request.params;

    // Temukan transaksi berdasarkan ID
    const transaction = await TransaksiSampah.findByPk(id_transaksi);
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

const getAllTransaksiSampahByPengepulId = async (request, h) => {
  try {
    const {
      id_pengepul
    } = request.params;

    // Temukan semua transaksi sampah yang dilakukan oleh pengepul tertentu
    const transactions = await TransaksiSampah.findAll({
      where: {
        id_pengepul
      },
      include: [{
          model: Sampah,
          attributes: ['jenis_sampah', 'nilai_koin_per_kg'] // Menambahkan detail sampah
        },
        {
          model: Pengguna,
          attributes: ['nama']
        }
      ]
    });



    return h.response(transactions).code(200);
  } catch (error) {
    console.error('Error fetching transactions by pengepul ID:', error);
    return h.response({
      message: 'Failed to fetch transactions'
    }).code(500);
  }
};


const getAllTransakasiSampahByPenggunaId = async (request, h) => {
  try {
    const {
      id_pengguna
    } = request.params

    const transactions = await TransaksiSampah.findAll({
      where: {
        id_pengguna
      },

      include: [{
        model: Sampah,
        attributes: ['jenis_sampah', 'nilai_koin_per_kg'],
      }, {
        model: Pengepul,
        attributes: ['nama']
      }]
    });

    return h.response(transactions).code(200);
  } catch (error) {
    console.error('Error fetching transactions by pengguna ID:', error);
    return h.response({
      message: 'Failed to fetch transactions'
    }).code(500);

  }
}

const getAllTransakasiPenggunaByStatusPending = async (request, h) => {
  try {
    const {
      id_pengguna
    } = request.params;

    // Temukan semua transaksi dengan status 'pending' untuk pengguna tertentu
    const transactions = await TransaksiSampah.findAll({
      where: {
        id_pengguna,
        status: 'pending'
      },
      include: [{
          model: Sampah,
          attributes: ['jenis_sampah', 'nilai_koin_per_kg'] // Menambahkan detail sampah
        },
        {
          model: Pengepul,
          attributes: ['nama']
        }, {
          model: Pengguna,
          attributes: ['nama']
        }
      ]
    });


    return h.response({
      status: "success",
      message: "data berhasil di dapatkan",
      data: transactions
    }).code(200);
  } catch (error) {
    console.error('Error fetching pending transactions by pengguna ID:', error);
    return h.response({
      message: 'Failed to fetch transactions'
    }).code(500);
  }
};
const getAllTransakasiPengepulByStatusPending = async (request, h) => {
  try {
    const {
      id_pengepul
    } = request.params;

    // Temukan semua transaksi dengan status 'pending' untuk pengguna tertentu
    const transactions = await TransaksiSampah.findAll({
      where: {
        id_pengepul,
        status: 'pending'
      },
      include: [{
          model: Sampah,
          attributes: ['jenis_sampah', 'nilai_koin_per_kg'] // Menambahkan detail sampah
        },
        {
          model: Pengepul,
          attributes: ['nama']
        }, {
          model: Pengguna,
          attributes: ['nama', 'alamat']
        }
      ]
    });


    return h.response({
      status: "success",
      message: "data berhasil di dapatkan",
      data: transactions
    }).code(200);
  } catch (error) {
    console.error('Error fetching pending transactions by pengguna ID:', error);
    return h.response({
      message: 'Failed to fetch transactions'
    }).code(500);
  }
};

const getTransaksiSampahById = async (request, h) => {
  try {
    const transaksi = await TransaksiSampah.findByPk(request.params.id);
    if (transaksi) {
      return h.response(transaksi).code(200);
    }
    return h.response({
      message: 'Transaksi Sampah not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const updateTransaksiSampah = async (request, h) => {
  try {
    const transaksi = await TransaksiSampah.findByPk(request.params.id);
    if (transaksi) {
      await transaksi.update(request.payload);
      return h.response(transaksi).code(200);
    }
    return h.response({
      message: 'Transaksi Sampah not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const deleteTransaksiSampah = async (request, h) => {
  try {
    const transaksi = await TransaksiSampah.findByPk(request.params.id);
    if (transaksi) {
      await transaksi.destroy();
      return h.response({
        message: 'Transaksi Sampah deleted'
      }).code(200);
    }
    return h.response({
      message: 'Transaksi Sampah not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

module.exports = {
  createTransaksiSampah,
  getAllTransaksiSampah,
  getTransaksiSampahById,
  updateTransaksiSampah,
  deleteTransaksiSampah,
  getAllTransaksiSampahByPengepulId,
  verifyTransactionByPengepul,
  rejectTransactionByPengepul,
  getAllTransakasiSampahByPenggunaId,
  getAllTransakasiPenggunaByStatusPending,
  getALlRiwayatTraksaksiByIdPengguna,
  getALlRiwayatTraksaksiByIdPengepul,
  getAllTransakasiPengepulByStatusPending
};