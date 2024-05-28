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
    const nilaiTukarKoin = await NilaiTukarKoin.findByPk(request.params.id);
    if (nilaiTukarKoin) {
      await NilaiTukarKoin.destroy();
      return h.response({
        message: 'NilaiTukarKoin deleted'
      }).code(200);
    }
    return h.response({
      message: 'NilaiTukarKoin not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

module.exports = {
  createNilaiTukarKoin,
  getAllNilaiTukarKoin,
  getNilaiTukarKoinById,
  updateNilaiTukarKoin,
  deleteNilaiTukarKoin,
};