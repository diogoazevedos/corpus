const { reject, resolve } = require('bluebird');
const { createPool } = require('mysql2/promise');

const database = [];

/**
 * Get a connection.
 *
 * @return {Promise}
 */
const connect = () => database.pool.getConnection()
  .catch(() => reject('Falha ao conectar com o banco'));

/**
 * Execute the given sql with the given params in the given connection.
 *
 * @param  {PoolConnection}  connection
 * @param  {String}  sql
 * @param  {Array}  params
 * @return {Promise}
 */
const execute = (connection, sql, params) => connection.execute(sql, params)
  .catch(() => reject('Falha ao executar a operação'));

/**
 * Execute a query.
 *
 * @param  {PoolConnection}  connection
 * @param  {String}  sql
 * @param  {Array}  params
 * @return {Promise}
 */
exports.query = (connection, sql, params) => {
  if (params === undefined) {
    params = sql;
    sql = connection;

    return connect().then(connection => (
      execute(connection, sql, params).finally(() => connection.release())
    ));
  }

  return execute(connection, sql, params);
};

/**
 * Begin a transaction.
 *
 * @return {Promise}
 */
exports.transaction = () => connect().then(connection => (
  connection.query('START TRANSACTION')
    .then(() => resolve(connection))
    .catch(() => {
      connection.release();
      return reject('Falha ao iniciar um transação');
    })
));

/**
 * Rollback a transaction.
 *
 * @param  {PoolConnection}  connection
 * @return {Undefined}
 */
const rollback = exports.rollback = connection => connection.query('ROLLBACK')
  .then(() => connection.release())
  .catch(() => connection.destroy());

/**
 * Commit a transaction.
 *
 * @param  {PoolConnection}  connection
 * @return {Promise}
 */
exports.commit = connection => connection.query('COMMIT')
  .then(() => resolve(connection.release()))
  .catch(() => {
    rollback();
    return reject('Falha ao completar a transação');
  });

/**
 * Create a pool.
 *
 * @return {Undefined}
 */
exports.connect = () => {
  const options = {
    Promise: require('bluebird'),
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: process.env.DB_LIMIT,
    bigNumberStrings: true,
    supportBigNumbers: true,
    multipleStatements: true,
    dateStrings: true,
    timezone: 'UTC',
  };

  if (process.env.DB_SECURE) {
    options.ssl = 'Amazon RDS';
  }

  if (!database.connected) {
    database.pool = createPool(options);
    database.connected = true;
  }
};

/**
 * Terminate a pool.
 *
 * @return {Promise}
 */
exports.disconnect = () => {
  delete database.connected;
  return database.pool.end();
};
