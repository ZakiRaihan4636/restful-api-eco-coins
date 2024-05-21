const {createUser, getDataUser, getDataUserById, loginHandler, updateUser} = require('./handlers/usersHandler');
const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => {
      return 'Hello World!';
    },
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: getDataUserById,
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: updateUser,
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
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler,
  },
]

module.exports = routes;