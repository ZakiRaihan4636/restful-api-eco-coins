const jwt = require('jsonwebtoken');
const Pengguna = require('../models/Pengguna');
const Pengepul = require('../models/Pengepul');
const config = require('../config/config');
const bcrypt = require('bcrypt');

const loginPengguna = async (request, h) => {
  try {
    const {
      email,
      password
    } = request.payload;
    const user = await Pengguna.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return h.response({
        message: 'Pengguna not found'
      }).code(404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return h.response({
        message: 'Invalid email or password'
      }).code(401);
    }

    const token = jwt.sign({
      id_pengguna: user.id_pengguna,
      role: 'pengguna'
    }, config.jwtSecret, {
      expiresIn: '1h'
    }, { algorithm: 'HS256' },);
    return h.response({
      id_pengguna: user.id_pengguna,
      token: token,
      expiresIn: '1h',
      role: 'pengguna'
    }).code(200);
  } catch (error) {
    console.error('Error during authentication:', error);
    return h.response({
      message: 'Internal server error'
    }).code(500);
  }
};

const loginPengepul = async (request, h) => {
  try {
    const {
      email,
      password
    } = request.payload;
    const user = await Pengepul.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return h.response({
        message: 'Pengepul not found'
      }).code(404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return h.response({
        message: 'Invalid email or password'
      }).code(401);
    }

    const token = jwt.sign({
      id_pegepul: user.id_pengepul,
      role: 'pengepul'
    }, config.jwtSecret, {
      expiresIn: '1h'
    }, );
    return h.response({
      id_pengepul: user.id_pengepul,
      expiresIn: '1h',
      role: 'pengepul',
      token: token
    }).code(200);
  } catch (error) {
    console.error('Error during authentication:', error);
    return h.response({
      message: 'Internal server error'
    }).code(500);
  }
}; 


module.exports = {
  loginPengguna,
  loginPengepul
};