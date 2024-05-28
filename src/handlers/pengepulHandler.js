const Pengepul = require('../models/Pengepul');
const bcrypt = require('bcrypt');
const {
  generateToken
} = require('../handlers/authHandler'); // Impor fungsi generateToken dari file auth.js


const loginPengepul = async (request, h) => {
  try {
    const {
      email,
      password
    } = request.payload;

    // Cari pengguna berdasarkan email
    const pengepul = await Pengepul.findOne({
      where: {
        email
      }
    });

    // Jika pengepul tidak ditemukan, kembalikan respons dengan kode status 404
    if (!pengepul) {
      return h.response({
        message: 'pengepul tidak ditemukan'
      }).code(404);
    }

    // Verifikasi password
    const passwordMatch = await bcrypt.compare(password, pengepul.password);

    // Jika password tidak cocok, kembalikan respons dengan kode status 401
    if (!passwordMatch) {
      return h.response({
        message: 'Email atau password salah'
      }).code(401);
    }

    // Jika autentikasi berhasil, buat token JWT
    const token = generateToken(pengepul.id, 'pengepul');

    // Kembalikan token sebagai respons dengan kode status 200
    return h.response({
      "id_picker": pengepul.id_pengepul,
      "nama_pengepul": pengepul.nama,
      "token": token,
    }).code(200);
  } catch (error) {
    console.error('Error authenticating user:', error);
    return h.response({
      message: 'Terjadi kesalahan internal saat melakukan autentikasi'
    }).code(500);
  }
};

const createPengepul = async (request, h) => {
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
        message: 'Semua bidang harus diisi'
      }).code(400);
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return h.response({
        message: 'Email tidak valid'
      }).code(400);
    }

    const existingEmail = await Pengepul.findOne({
      where: {
        email: email
      }
    });

    if (existingEmail) {
      return h.response({
        message: 'email sudah digunakan'
      }).code(400);
    }

    if (telepon <= 11) {
      return h.response({
        message: "No Telepon tidak valid"
      }).code(400)
    }

    // Enkripsi password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const pengepul = await Pengepul.create({
      nama,
      alamat,
      email,
      telepon,
      password: hashedPassword
    });
    return h.response(pengepul).code(201);
  } catch (err) {
    console.error('Error creating user:', err);
    return h.response({
      message: 'Terjadi kesalahan internal saat membuat pengguna'
    }).code(500);
  }
};

const getAllPengepul = async (request, h) => {
  try {
    const pengepul = await Pengepul.findAll();
    return h.response(pengepul).code(200);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const getPengepulById = async (request, h) => {
  try {
    const pengepul = await Pengepul.findByPk(request.params.id);
    if (pengepul) {
      return h.response(pengepul).code(200);
    }
    return h.response({
      message: 'Pengepul not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const updatePengepul = async (request, h) => {
  try {
    const pengepul = await Pengepul.findByPk(request.params.id);
    if (pengepul) {
      await pengepul.update(request.payload);
      return h.response(pengepul).code(200);
    }
    return h.response({
      message: 'Pengepul not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

const deletePengepul = async (request, h) => {
  try {
    const pengepul = await Pengepul.findByPk(request.params.id);
    if (pengepul) {
      await pengepul.destroy();
      return h.response({
        message: 'Pengepul deleted'
      }).code(200);
    }
    return h.response({
      message: 'Pengepul not found'
    }).code(404);
  } catch (err) {
    return h.response(err).code(500);
  }
};

module.exports = {
  loginPengepul,
  createPengepul,
  getAllPengepul,
  getPengepulById,
  updatePengepul,
  deletePengepul,
};