
exports.up = function(knex, promisse) {
    return knex.schema.createTable('frete', table => {
        table.increments('id').primary()
        table.string('status').notNull()
        table.string('empresa').notNull()
        table.datetime('data_saida')
        table.string('origem').notNull()
        table.datetime('data_chegada')
        table.string('destino').notNull()
        table.string('tipo_veiculo').notNull()
        table.string('produto').notNull()
        table.string('especie').notNull()
        table.string('temperatura').notNull()
        table.string('rastreador').notNull()
        table.string('complemento').notNull()
        table.string('agenciamento').notNull()
        table.string('tipo_pagamento').notNull()
        table.decimal('peso',14,2)
        table.decimal('valor_frete')
        table.decimal('km_distancia',14,2)
        table.integer('quantidade_pedagio')
        table.decimal('valor_pedagio')
        table.string('pedagio_incluso').notNull()
        table.integer('id_cliente').references('id').inTable('cliente').notNull()
    })
};

exports.down = function(knex, promisse) {
    return knex.schema.dropTable('frete')
};
