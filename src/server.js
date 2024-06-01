/* eslint-disable no-console */
const Hapi = require('@hapi/hapi');
const sequelize = require('./config/sequelize');
const penggunaRoutes = require('./routes/penggunaRoutes');
const sampahRoutes = require('./routes/sampahRoutes');
const transaksiSampahRoutes = require('./routes/transaksiSampahRoutes');
const pengepulRoutes = require('./routes/pengepulRoutes');
const penukaranKoinRoutes = require('./routes/penukaranKoinRoutes');
const nilaiTukarKoinRoutes = require('./routes/nilaiTukarKoinRoutes');
const Jwt = require('@hapi/jwt');
const config = require('./config/config');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ["*"]
      },
    },
  });

  await server.register(Jwt);

  // Configure JWT strategy
  server.auth.strategy('jwt', 'jwt', {
    keys: config.jwtSecret,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400 // 4 hours
    },
    
    validate: async (artifacts, request, h) => {
            return {
                isValid: true,
                credentials: { user: artifacts.decoded.payload }
            };
        }
  });

  server.auth.default('jwt')


  server.route(penggunaRoutes);
  server.route(sampahRoutes);
  server.route(transaksiSampahRoutes);
  server.route(pengepulRoutes);
  server.route(penukaranKoinRoutes);
  server.route(nilaiTukarKoinRoutes);



  try {
    // Sync Sequelize models
    await sequelize.sync({
      force: false
    });
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