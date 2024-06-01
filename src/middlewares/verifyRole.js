const Boom = require('@hapi/boom');

const verifyRole = (requiredRole) => {
  return (request, h) => {
    const {
      user
    } = request.auth.credentials;
    if (user.role !== requiredRole) {
      console.log(" Hello "+user.role)
      throw Boom.unauthorized('Insufficient permissions');
    }
    return h.continue;
  };
};

module.exports = verifyRole