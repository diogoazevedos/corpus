require('dotenv').config();

const moment = require('moment');

moment.fn.toString = function () {
  return this.format('YYYY-MM-DD HH:mm:ss');
};

const { connect } = require('./src/Database/Connection');

connect();
