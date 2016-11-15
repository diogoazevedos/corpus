const UserRepository = require('../Repositories/User');

const repository = new UserRepository();

exports.all = () => repository.all();
exports.find = (id, connection = null) => repository.find(id, connection);
exports.store = (user, connection = null) => repository.store(user, connection);
