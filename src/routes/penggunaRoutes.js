const authMiddleware = require('../middlewares/authMiddleware');
const penggunaHandler = require('../handlers/penggunaHandler')
const authHandler = require ('../handlers/authHandler')

module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: authHandler.loginPengguna,
  },
  {
    method: 'POST',
    path: '/pengguna',
    handler: penggunaHandler.createPengguna,
  },
  {
    method: 'GET',
    path: '/pengguna',
    handler: penggunaHandler.getAllPengguna,
    options: {
      pre: [authMiddleware]
    }
  },
  {
    method: 'GET',
    path: '/pengguna/{id}',
    handler: penggunaHandler.getPenggunaById,
  },
  {
    method: 'PUT',
    path: '/pengguna/{id}',
    handler: penggunaHandler.updatePengguna,
  },
  {
    method: 'DELETE',
    path: '/pengguna/{id}',
    handler: penggunaHandler.deletePengguna,
  },
];
