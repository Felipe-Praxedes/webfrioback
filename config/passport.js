const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('cliente')
            .where({ id: payload.id })
            .first()
            .then(cliente => {
                if (cliente) {
                    done(null, { id: cliente.id, email: cliente.email, tipo: cliente.tipo, nome: cliente.nome })
                } else {
                    done(null, false)
                }
            })
            .catch(err => done(err, false))
    })

    passport.use(strategy)
    
    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', { session: false})
    }
}
