const knex = require('knex')({ client: 'mysql' });

const { resolve } = require('bluebird');
const { query } = require('../Database/Connection');

class Repository {
  /**
   * Fetch all users.
   *
   * @param  {PoolConnection}  [connection=null]
   * @return {Promise}
   */
  all(connection = null) {
    const { sql, bindings } = knex(this.table).toSQL();
    const Model = this.model;

    return query(sql, bindings, connection).then((record) => {
      if (record[0].length) {
        return resolve(record[0].map(record => new Model(record)));
      }

      return resolve(null);
    });
  }

  /**
   * Find an user by id.
   *
   * @param  {String}  id
   * @param  {PoolConnection}  [connection=null]
   * @return {Promise}
   */
  find(id, connection = null) {
    const { sql, bindings } = knex(this.table).where('id', id).toSQL();
    const Model = this.model;

    return query(sql, bindings, connection).then((record) => {
      if (record[0].length) {
        return resolve(new Model(record[0][0]));
      }

      return resolve(null);
    });
  }

  /**
   * Store an user.
   *
   * @param  {Object}  user
   * @param  {PoolConnection}  [connection=null]
   * @return {Promise}
   */
  store(user, connection = null) {
    const { sql, bindings } = knex(this.table).insert(user).toSQL();

    return query(sql, bindings, connection)
      .then(record => this.find(String(record[0].insertId), connection));
  }
}

module.exports = Repository;
