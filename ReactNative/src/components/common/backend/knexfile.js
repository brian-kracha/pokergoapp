'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/pokergodb_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/pokergodb_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
