const UserController = require('../src/Http/Controllers/User');

const { define, wrap, post, get } = require('spirit-router');
const { json } = require('body-parser');
const express  = require('spirit-express');

module.exports = define('/api', [
  get('/users', UserController.index),
  get('/users/:user_id', ['user_id'], UserController.show),
  wrap(post('/users', ['body'], UserController.store), express(json())),
]);
