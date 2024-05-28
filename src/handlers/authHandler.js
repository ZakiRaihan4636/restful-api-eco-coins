const jwt = require('jsonwebtoken');
const Pengguna = require('../models/Pengguna');
const config = require('../config/config');
const bcrypt = require('bcrypt');

const loginPengguna = async (request, h) => {
  try {
    const {
      email,
      password
    } = request.payload;

    // Cari pengguna berdasarkan email
    const user = await Pengguna.findOne({
      where: {
        email
      }
    });

    // Jika pengguna tidak ditemukan, kembalikan respons dengan kode status 404
    if (!user) {
      return h.response({
        message: 'Pengguna tidak ditemukan'
      }).code(404);
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Jika password tidak cocok, kembalikan respons dengan kode status 401
    if (!isPasswordValid) {
      return h.response({
        message: 'Email atau password salah'
      }).code(401);
    }

    // Buat token JWT
    const token = jwt.sign({
      id_pengguna: user.id_pengguna
    }, config.jwtSecret, {
      expiresIn: '1h' // Token berlaku selama 1 jam
    });

    // Kembalikan token sebagai respons dengan kode status 200
    return h.response({
      token
    }).code(200);
  } catch (error) {
    console.error('Error authenticating user:', error);
    return h.response({
      message: 'Terjadi kesalahan internal saat melakukan autentikasi'
    }).code(500);
  }

  
};

module.exports = {
  loginPengguna
};