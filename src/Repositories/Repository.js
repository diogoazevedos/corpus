const knex = require('knex')({ client: 'mysql' });
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

    return query(sql, bindings, connection).then(record => (
      record[0].map(record => new this.model().force(record))
    ));
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

    return query(sql, bindings, connection).then((record) => {
      if (record[0].length) {
        return new this.model().force(record[0][0]);
      }

      return null;
    });
  }

  /**
   * Store an user.
   *
   * @param  {Object}  data
   * @param  {PoolConnection}  [connection=null]
   * @return {Promise}
   */
  store(data, connection = null) {
    const model = new this.model().fill(data);

    const { sql, bindings } = knex(this.table).insert(model).toSQL();

    return query(sql, bindings, connection)
      .then(record => this.find(String(record[0].insertId), connection));
  }
}

module.exports = Repository;
