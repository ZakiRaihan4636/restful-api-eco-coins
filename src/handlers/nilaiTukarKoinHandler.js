const NilaiTukarKoin = require('../models/NilaiTukarKoin');

const createNilaiTukarKoin = async (request, h) => {
  try {
    const nilaiTukarKoin = await NilaiTukarKoin.create(request.payload);
    return h.response(nilaiTukarKoin).code(201);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const getAllNilaiTukarKoin = async (request, h) => {
  try {
    const nilaiTukarKoin = await NilaiTukarKoin.findAll();
    return h.response(nilaiTukarKoin).code(200);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const getNilaiTukarKoinById = async (request, h) => {
  try {
    const nilaiTukarKoin = await NilaiTukarKoin.findByPk(request.params.id);
    if (NilaiTukarKoin) {
      return h.response(nilaiTukarKoin).code(200);
    }
    return h.response({
      message: 'NilaiTukarKoin not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const updateNilaiTukarKoin = async (request, h) => {
  try {
    const nilaiTukarKoin = await NilaiTukarKoin.findByPk(request.params.id);
    if (nilaiTukarKoin) {
      await NilaiTukarKoin.update(request.payload);
      return h.response(nilaiTukarKoin).code(200);
    }
    return h.response({
      message: 'NilaiTukarKoin not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const deleteNilaiTukarKoin = async (request, h) => {
  try {
    console.log('Starting deletion process');

    const {
      id_nilai_tukar_koin
    } = request.params;
    console.log('ID to delete:', id_nilai_tukar_koin);                                      

    // Assuming Sequelize or similar ORM is used
    const deletedCount = await NilaiTukarKoin.destroy({
      where: {
        id_nilai_tukar_koin
      }
    });
    console.log('Deleted count:', deletedCount);

    if (deletedCount === 0) {
      return h.response({
        message: 'Nilai Tukar Koin not found'
      }).code(404);
    }

    return h.response({
      message: 'Nilai Tukar Koin deleted successfully'
    }).code(200);
  } catch (error) {
    console.error('Error deleting Nilai Tukar Koin:', error);
    return h.response({
      message: 'Internal Server Error'
    }).code(500);
  }
}

module.exports = {
  createNilaiTukarKoin,
  getAllNilaiTukarKoin,
  getNilaiTukarKoinById,
  updateNilaiTukarKoin,
  deleteNilaiTukarKoin,
};