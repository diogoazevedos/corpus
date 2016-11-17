require('./bootstrap');

const express  = require('spirit-express');
const { node } = require('spirit');
const { json } = require('body-parser');

const routes = require('./routes/api');
const app = node.adapter(routes, [
  express(json()),
]);

const { createServer } = require('http');
createServer(app).listen(process.env.PORT || 1337);
