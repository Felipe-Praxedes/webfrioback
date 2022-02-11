const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.senha) {
            return res.status(400).send("Dados imcompletos!")
        }

        const user = await app.db('cliente')
            .where({ email: req.body.email })
            .first()

        if (user) {
            bcrypt.compare(req.body.senha, user.senha, (err, isMatch) => {
                if (err || !isMatch) {
                    return res.status(401).send("Senha incorreta")
                }

                const payload = { id: user.id }
                res.json({
                    nome: user.nome,
                    email: user.email,
                    token: jwt.encode(payload, authSecret),
                })
            })
        } else {
            res.status(400).send('Usuário não cadastrado')
        }
    }

    return { signin }

}