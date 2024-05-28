const Sampah = require('../models/Sampah');

const createSampah = async (request, h) => {
  try {
    const sampah = await Sampah.create(request.payload);
    return h.response(sampah).code(201);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const getAllSampah = async (request, h) => {
  try {
    const sampah = await Sampah.findAll();
    return h.response(sampah).code(200);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const getSampahById = async (request, h) => {
  try {
    const sampah = await Sampah.findByPk(request.params.id);
    if (sampah) {
      return h.response(sampah).code(200);
    }
    return h.response({
      message: 'Sampah not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const updateSampah = async (request, h) => {
  try {
    const sampah = await Sampah.findByPk(request.params.id);
    if (sampah) {
      await sampah.update(request.payload);
      return h.response(sampah).code(200);
    }
    return h.response({
      message: 'Sampah not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const deleteSampah = async (request, h) => {
  try {
    const sampah = await Sampah.findByPk(request.params.id);
    if (sampah) {
      await sampah.destroy();
      return h.response({
        message: 'Sampah deleted'
      }).code(200);
    }
    return h.response({
      message: 'Sampah not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

module.exports = {
  createSampah,
  getAllSampah,
  getSampahById,
  updateSampah,
  deleteSampah,
};