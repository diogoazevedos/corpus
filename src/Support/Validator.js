const Ajv = require('ajv');
const response = require('./Response');
const { reject } = require('bluebird');
const { assign } = require('lodash');

const { compile } = new Ajv();

module.exports = (value, schema) => (
  compile(assign({ $async: true }, schema))(value)
    .catch(({ errors }) => reject(
      response(422, errors.map(error => error.message))
    ))
);
