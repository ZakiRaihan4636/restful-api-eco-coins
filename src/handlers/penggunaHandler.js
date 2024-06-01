const bcrypt = require('bcrypt');
const Pengguna = require('../models/Pengguna');

const createPengguna = async (request, h) => {
  try {
    const {
      nama,
      alamat,
      email,
      telepon,
      password
    } = request.payload;

    // Pastikan data yang diterima sesuai dengan yang diharapkan
    if (!nama || !alamat || !email || !telepon || !password) {
      return h.response({
        message: 'data tidak boleh kosong'
      }).code(400);
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return h.response({
        message: 'Email tidak valid'
      }).code(400);
    }

    const existingEmail = await Pengguna.findOne({
      where: {email: email}
    });

    if (existingEmail) { 
      return h.response(
        { message: 'email sudah digunakan' }
      ).code(400);
    }

    if (telepon <= 11 ) {
      return h.response(
        {message: "No Telepon tidak valid"}
      ).code(400)
    }
    

    // Enkripsi password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const pengguna = await Pengguna.create({
      nama,
      alamat,
      email,
      telepon,
      password: hashedPassword
    });
    return h.response({
      status: 'success',
      message: 'data pengguna berhasil dibuat',
      users: pengguna
    }).code(201);
  } catch (err) {
    console.error('Error creating user:', err);
    return h.response({
      message: 'Terjadi kesalahan internal saat membuat pengguna'
    }).code(500);
  }
};


const getAllPengguna = async (request, h) => {
  try {
    const pengguna = await Pengguna.findAll();
    return h.response({
      status: "sucess",
      message: "Data users berhasil didapatkan",
      pengguna: pengguna,
    }).code(200);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const getPenggunaById = async (request, h) => {
  try {
    const pengguna = await Pengguna.findByPk(request.params.id);
    if (pengguna) {
      return h.response({
        status: "success",
        "message": "Data Pengguna by id successfully retrieved",
        pengguna
      }).code(200);
    }
    return h.response({
      message: 'Pengguna not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const updatePengguna = async (request, h) => {
  try {
    const pengguna = await Pengguna.findByPk(request.params.id);
    if (pengguna) {
      await pengguna.update(request.payload);
      return h.response(pengguna).code(200);
    }
    return h.response({
      message: 'Pengguna not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const deletePengguna = async (request, h) => {
  try {
    const pengguna = await Pengguna.findByPk(request.params.id);
    if (pengguna) {
      await pengguna.destroy();
      return h.response({
        message: 'Pengguna deleted'
      }).code(200);
    }
    return h.response({
      message: 'Pengguna not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

module.exports = {
  createPengguna,
  getAllPengguna,
  getPenggunaById,
  updatePengguna,
  deletePengguna,
};
