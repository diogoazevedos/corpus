const UserController = require('../src/Http/Controllers/User');

const router = require('spirit-router');

module.exports = router.define('/api', [
  router.get('/users', UserController.index),
  router.get('/users/:user_id', ['user_id'], UserController.show),
  router.post('/users', ['body'], UserController.store),
]);
