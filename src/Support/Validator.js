const Ajv = require('ajv');
const { assign } = require('lodash');
const { reject } = require('bluebird');

const { compile } = new Ajv();

module.exports = (value, schema) => (
  compile(assign({ $async: true }, schema))(value)
    .catch(({ errors }) => reject(errors.map(error => error.message)))
);
