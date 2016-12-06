require('dotenv').config();

const { node: { adapter } } = require('spirit');
const { createServer } = require('http');
const { connect } = require('./src/Database/Connection');
const routes = require('./routes');

connect();

const app = adapter(routes, [
  handler => request => handler(request).catch(error => error),
]);

createServer(app).listen(process.env.PORT || 1337);
