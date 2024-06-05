const penukaranKoinHandler = require('../handlers/penukaranKoinHandler');
const verifyRole = require('../middlewares/verifyRole');

module.exports = [{
    method: 'POST',
    path: '/penukaran-koin',
    handler: penukaranKoinHandler.createPenukaranKoin,
    options: {
      pre: [verifyRole('pengguna')]
    }
  },
  {
    method: 'GET',
    path: '/penukaran-koin',
    handler: penukaranKoinHandler.getAllPenukaranKoin,
    options: {
      pre: [verifyRole('pengepul'), verifyRole('pengguna')]
    }
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
    options: {
      pre: [verifyRole('pengepul'), verifyRole('pengguna')]
    }
  },
  {
    method: 'POST',
    path: '/penukaran-koin/{id_penukaran}/verify',
    handler: penukaranKoinHandler.verifyReedeemCoinByPengepul,
    options: {
      pre: [verifyRole('pengepul')]
    }
  },
  {
    method: 'GET',
    path: '/penukaran-koin/pengepul/{id_pengepul}',
    handler: penukaranKoinHandler.getAllPenukaranKoinByPengepul,
    options: {
      pre: [verifyRole('pengepul')]
    }
  },
  {
    method: 'GET',
    path: '/penukaran-koin/pengepul/{id_pengepul}/status/pending',
    handler: penukaranKoinHandler.getAllPenukaranKoinByStatusByPengepul,
    options: {
      pre: [verifyRole('pengepul')]
    }
  },
  {
    method: 'GET',
    path: '/penukaran-koin/pengguna/{id_pengguna}/status/pending',
    handler: penukaranKoinHandler.getAllPenukaranKoinByStatusByPengguna,
    options: {
      pre: [verifyRole('pengguna')]
    }
  },
];