const sampahHandler = require('../handlers/sampahHandler');

module.exports = [{
    method: 'POST',
    path: '/sampah',
    handler: sampahHandler.createSampah,
  },
  {
    method: 'GET',
    path: '/sampah',
    handler: sampahHandler.getAllSampah,
  },
  {
    method: 'GET',
    path: '/sampah/{id}',
    handler: sampahHandler.getSampahById,
  },
  {
    method: 'PUT',
    path: '/sampah/{id}',
    handler: sampahHandler.updateSampah,
  },
  {
    method: 'DELETE',
    path: '/sampah/{id}',
    handler: sampahHandler.deleteSampah,
  },
];
