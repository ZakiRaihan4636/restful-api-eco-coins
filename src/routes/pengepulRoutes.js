const pengepulHandler = require('../handlers/pengepulHandler');

module.exports = [
  {
    method: 'POST',
    path: '/login/picker',
    handler: pengepulHandler.loginPengepul,
  },
  {
    method: 'POST',
    path: '/pengepul',
    handler: pengepulHandler.createPengepul,
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
