// authMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Pastikan konfigurasi Anda mengandung jwtSecret

const verifyTokenMiddleware = async (request, h) => {
  try {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      return h.response({
        message: 'Token not provided'
      }).code(401);
    }

    const token = authorizationHeader.split(' ')[1]; // Ambil token dari header 'Authorization'
    if (!token) {
      return h.response({
        message: 'Token not provided'
      }).code(401);
    }

    const decodedToken = jwt.verify(token, config.jwtSecret);

    // Setel informasi otentikasi di dalam objek permintaan (request)
    request.auth = {
      userId: decodedToken.id_pengguna
    };

    return h.continue;
  } catch (err) {
    console.error('Error verifying token:', err);
    return h.response({
      message: 'Invalid token'
    }).code(401);
  }
};

module.exports = verifyTokenMiddleware;
