const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (senha, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(senha, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {
        obterHash(req.body.senha, hash => {
            const senha = hash

            app.db('cliente')
                .insert({ 
                    nome: req.body.nome, 
                    email: req.body.email, 
                    telefone: req.body.telefone, 
                    tipo: req.body.tipo,
                    senha 
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(400).json(err))
        })
    }
    return { save }
}