
exports.up = function (knex, Promise) {
    return knex.schema.createTable('cliente', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('email').notNull().unique()
        table.string('telefone').notNull()
        table.string('tipo').notNull()
        table.string('senha').notNull()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('cliente')
};