const Entity = require('./Entity');

class User extends Entity {
  get dates() {
    return [
      'created_at',
    ];
  }

  get fillable() {
    return [
      'name',
      'email',
    ];
  }
}

module.exports = User;
