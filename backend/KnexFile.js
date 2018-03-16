'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/pokergo'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/pokergo'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
