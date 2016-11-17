const response = require('../Support/Response');
const validator = require('../Support/Validator');

const UserRepository = require('../Repositories/User');
const repository = new UserRepository();

exports.all = () => repository.all();
exports.find = (id, connection = null) => repository.find(id, connection);
exports.store = (request, connection = null) => (
  validator(request, {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
    },
  })
  .then(() => repository.store(request, connection))
  .then(user => response(201, user))
  .catch(error => response(422, error))
);
