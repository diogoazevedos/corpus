const response = require('../Support/Response');
const validator = require('../Support/Validator');

const UserRepository = require('../Repositories/User');
const repository = new UserRepository();

const { single, collection } = require('../Transformers/User');

exports.all = () => repository.all().then(collection);

exports.find = (id, connection = null) => (
  repository.find(id, connection).then(single)
);

exports.store = (request, connection = null) => (
  validator(request, {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
    },
  })
  .then(() => repository.store(request, connection).then(single))
  .then(user => response(201, user))
  .catch(error => response(422, error))
);
