const PenukaranKoin = require('../models/PenukaranKoin');
const Pengguna = require('../models/Pengguna');
const Pengepul = require('../models/Pengepul');
const NilaiTukarKoin = require('../models/NilaiTukarKoin');

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

    // Kurangi saldo koin pengguna
    await Pengguna.decrement('saldo_koin', {
      by: nilaiTukar.nilai_koin,
      where: {
        id_pengguna: pengguna.id_pengguna
      }
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

module.exports = {
  createPenukaranKoin,
  getAllPenukaranKoin,
  getPenukaranKoinById,
  updatePenukaranKoin,
  deletePenukaranKoin,
};