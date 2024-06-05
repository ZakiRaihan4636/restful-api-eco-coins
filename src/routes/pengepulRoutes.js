const pengepulHandler = require('../handlers/pengepulHandler');
const authHandler = require('../handlers/authHandler');

module.exports = [{
    method: 'POST',
    path: '/login/pengepul',
    handler: authHandler.loginPengepul,
    options: {
      auth: false,
    }
  },
  {
    method: 'POST',
    path: '/pengepul',
    handler: pengepulHandler.createPengepul,
    options: {
      auth: false,
    }
  },
  {
    method: 'GET',
    path: '/pengepul',
    handler: pengepulHandler.getAllPengepul,
  },
  {
    method: 'GET',
    path: '/pengepul/{id}',
    handler: pengepulHandler.getPengepulById,
  },
  {
    method: 'PUT',
    path: '/pengepul/{id}',
    handler: pengepulHandler.updatePengepul,
  },
  {
    method: 'DELETE',
    path: '/pengepul/{id}',
    handler: pengepulHandler.deletePengepul,
  },
];