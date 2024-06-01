const penggunaHandler = require('../handlers/penggunaHandler')
const authHandler = require('../handlers/authHandler');
const verifyRole = require('../middlewares/verifyRole');
module.exports = [{
    method: 'POST',
    path: '/login/pengguna',
    handler: authHandler.loginPengguna,
    options: {
        auth: false,
      }
    },
  {
    method: 'POST',
    path: '/pengguna',
    handler: penggunaHandler.createPengguna,
    options: {
      auth: false,
    }
  },
  {
    method: 'GET',
    path: '/pengguna',
    handler: penggunaHandler.getAllPengguna,
    options: {
      auth: false,
    }
  },
  {
    method: 'GET',
    path: '/pengguna/{id}',
    handler: penggunaHandler.getPenggunaById,
    options: {
      pre: [verifyRole('pengguna')]
    }
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