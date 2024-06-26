const sampahHandler = require('../handlers/sampahHandler');
const verifyRole = require('../middlewares/verifyRole');

module.exports = [{
    method: 'POST',
    path: '/sampah',
    handler: sampahHandler.createSampah,
    options: {
      pre: [verifyRole('pengepul')]
    }

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
    options: {
      pre: [verifyRole('pengepul')]
    }
  },
  {
    method: 'PUT',
    path: '/sampah/{id}',
    handler: sampahHandler.updateSampah,
    options: {
      pre: [verifyRole('pengepul')]
    }
  },
  {
    method: 'DELETE',
    path: '/sampah/{id}',
    handler: sampahHandler.deleteSampah,
    options: {
      pre: [verifyRole('pengepul')]
    }
  },
];