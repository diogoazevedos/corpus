const UserController = require('../src/Http/Controllers/User');

const { define, wrap, post, get, any, notFound } = require('spirit-router');
const { json } = require('body-parser');
const express  = require('spirit-express');

const api = define('/api', [
  get('/users', UserController.index),
  get('/users/:user_id', ['user_id'], UserController.show),
  wrap(post('/users', ['body'], UserController.store), express(json())),
]);

module.exports = define([api, any('*', notFound())]);
