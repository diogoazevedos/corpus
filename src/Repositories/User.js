const knex = require('knex')({ client: 'mysql' });
const { resolve } = require('bluebird');

const User = require('../Entities/User');
const { query } = require('../Database/Connection');

exports.find = (id) => {
  const builder = knex('user').where('id', id).toSQL();

  return query(builder.sql, builder.bindings)
    .then((record) => {
      if (record[0].length) {
        return resolve(new User(record[0][0]));
      }

      return resolve(null);
    });
};
