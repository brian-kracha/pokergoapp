
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('first_name')
    table.string('last_name')
    table.string('email')
    table.string('token')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
