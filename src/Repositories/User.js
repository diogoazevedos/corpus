const User = require('../Entities/User');
const Repository = require('./Repository');

class UserRepository extends Repository {
  get table() {
    return 'users';
  }

  get model() {
    return User;
  }
}

module.exports = UserRepository;
