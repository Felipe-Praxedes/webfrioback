const express = require('express')
const app = express()
const db = require('./config/db')
const consign = require('consign')

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routers.js')
    .into(app)

app.db = db

app.get('/', (req, res)=> {
    return res.status(200).send("Meu Back")
})
 
app.listen(3000, () => {
    console.log('Backend executando...')
})


/* exports.up = function (knex, Promise) {
    return knex.schema.createTable('cliente', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('telefone').notNull()
        table.string('tipo').notNull()
        table.string('password').notNull()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('cliente')
}; */