
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('first_name').default("")
    table.string('last_name').default("")
    table.string('email').default("")
    table.string('token')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
