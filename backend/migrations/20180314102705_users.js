
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table =>{

    table.increments();
    table.string('username').notNullable().default("")
    table.string('email').notNullable().default("")
    table.string('password').notNullable()
    table.dateTime('DOB').notNullable()
    table.string('friend')
  })



};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('users')
};
