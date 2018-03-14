
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('username').default("")
    table.string('email').default("")
    table.string('friend')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
