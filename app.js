require('./bootstrap');

const UserController = require('./src/Http/Controllers/User');

const router = require('spirit-router');
const routes = router.define([
  router.get('/users', UserController.index),
  router.get('/users/:user_id', ['user_id'], UserController.show),
]);

const express  = require('spirit-express');
const { node } = require('spirit');
const { json } = require('body-parser');

const app = node.adapter(routes, [
  express(json()),
]);

const { createServer } = require('http');
createServer(app).listen(process.env.PORT || 1337);
