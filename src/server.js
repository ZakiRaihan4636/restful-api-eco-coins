/* eslint-disable no-console */
const Hapi = require('@hapi/hapi');
const sequelize = require('./config/sequelize');
const penggunaRoutes = require('./routes/penggunaRoutes');
const sampahRoutes = require('./routes/sampahRoutes');
const transaksiSampahRoutes = require('./routes/transaksiSampahRoutes');
const pengepulRoutes = require('./routes/pengepulRoutes');
const penukaranKoinRoutes = require('./routes/penukaranKoinRoutes');
const nilaiTukarKoinRoutes = require('./routes/nilaiTukarKoinRoutes');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: true,
    },
  });

  server.route(penggunaRoutes);
  server.route(sampahRoutes);
  server.route(transaksiSampahRoutes);
  server.route(pengepulRoutes);
  server.route(penukaranKoinRoutes);
  server.route(nilaiTukarKoinRoutes);

  try {
    // Sync Sequelize models
    await sequelize.sync({ force: true });
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
