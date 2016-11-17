const Entity = require('./Entity');

class User extends Entity {
  get dates() {
    return [
      'created_at',
    ];
  }
}

module.exports = User;
