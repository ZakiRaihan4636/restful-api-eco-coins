const penukaranKoinHandler = require('../handlers/penukaranKoinHandler');

module.exports = [{
    method: 'POST',
    path: '/penukaran-koin',
    handler: penukaranKoinHandler.createPenukaranKoin,
  },
  {
    method: 'GET',
    path: '/penukaran-koin',
    handler: penukaranKoinHandler.getAllPenukaranKoin,
  },
  {
    method: 'GET',
    path: '/penukaran-koin/{id}',
    handler: penukaranKoinHandler.getPenukaranKoinById,
  },
  {
    method: 'PUT',
    path: '/penukaran-koin/{id}',
    handler: penukaranKoinHandler.updatePenukaranKoin,
  },
  {
    method: 'DELETE',
    path: '/penukaran-koin/{id}',
    handler: penukaranKoinHandler.deletePenukaranKoin,
  },
];
