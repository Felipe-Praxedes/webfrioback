module.exports = {
  client: 'postgresql',
  connection: {
    database: 'webfrio',
    host: 'pgsql21-farm10.kinghost.net',
    user: 'webfrio',
    password: 'webfrio',
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};


