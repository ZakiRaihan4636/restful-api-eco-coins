const {createUser, getDataUser} = require('./handlers/usersHandler');
const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello World!';
    },
  },
  {
    method: 'GET',
    path: '/users',
    handler: getDataUser,
  },
  {
    method: 'POST',
    path: '/users',
    handler: createUser,
  },
]

module.exports = routes;