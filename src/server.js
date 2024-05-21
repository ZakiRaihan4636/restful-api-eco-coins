/* eslint-disable no-console */
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const sequelize = require('./config/sequelize');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: true,
    },
  });

  server.route(routes);

  try {
    // Sync Sequelize models
    await sequelize.sync();
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
