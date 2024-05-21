const User = require('../models/User');

const createUser = async (request, h) => {
  const {
    username,
    password
  } = request.payload;
  const user = await User.create({
    username,
    password
  });
  return user;
};

const getDataUser = async () => {
  const users = await User.findAll();
  return users;
}

module.exports = {
  createUser,
  getDataUser
};