const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginHandler = async (request, h) => {
  try {
    const {
      username,
      password
    } = request.payload;

    // Cari pengguna berdasarkan username
    const user = await User.findOne({
      where: {
        username
      }
    });

    // Jika pengguna tidak ditemukan, kembalikan respons dengan status code 404 (Not Found)
    if (!user) {
      return h.response({
        message: 'Username atau password salah'
      }).code(404);
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Jika password tidak valid, kembalikan respons dengan status code 401 (Unauthorized)
    if (!isPasswordValid) {
      return h.response({
        message: 'Username atau password salah'
      }).code(401);
    }

    // Buat token JWT
    const token = jwt.sign({
      id: user.id,
      username: user.username
    }, 'secret_key', {
      expiresIn: '1h'
    });

    // Kembalikan respons dengan token JWT
    return h.response({
      token
    }).code(200);
  } catch (error) {
    console.error(error);
    return h.response({
      message: 'Terjadi kesalahan saat login'
    }).code(500);
  }
};

const createUser = async (request, h) => {
  const {
    nama_lengkap,
    gender,
    alamat,
    role,
    username,
    password
  } = request.payload;

  // Menggunakan bcrypt untuk hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      nama_lengkap,
      gender,
      alamat,
      role,
      username,
      password: hashedPassword
    });
    return user;
  } catch (error) {}
};


const getDataUser = async () => {
  const users = await User.findAll();
  return users;
}

const getDataUserById = async (request, h) => {
  const id = request.params.id
  const user = await User.findByPk(id);

  if (!user) {
    return h.response({
      error: 'User not found'
    }).code(404);
  }

  return user;
}

const updateUser = async (request, h) => {
  const {
    nama_lengkap,
    gender,
    alamat,
    role,
    username,
    password
  } = request.payload;
  const {
    id
  } = request.params; // Mengambil ID dari params
  
  let updateData = {
    nama_lengkap,
    gender,
    alamat,
    role,
    username
  };

  try {
    // Jika password diberikan, hash password tersebut
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // Melakukan update pada pengguna yang ada berdasarkan ID
    const [updatedRows] = await User.update(updateData, {
      where: {
        id
      }
    });

    if (updatedRows === 0) {
      return h.response({
        message: 'User not found'
      }).code(404);
    }

    return h.response({
      message: 'User updated successfully'
    }).code(200);
  } catch (error) {
    console.error(error);
    return h.response({
      message: 'Failed to update user'
    }).code(500);
  }
};

module.exports = {
  createUser,
  updateUser,
  getDataUser,
  getDataUserById,
  loginHandler
};