module.exports = app => {
    app.post('/signup', app.api.cliente.save)
    app.post('/signin', app.api.auth.signin)
    
    app.route('/frete')
        .all(app.config.passport.authenticate())
        .get(app.api.frete.getFrete)
        .post(app.api.frete.save)

    app.route('/frete/:id')
        .all(app.config.passport.authenticate())
        .delete(app.api.frete.remove)

    app.route('/frete/:id/toggle')
        .all(app.config.passport.authenticate)
        .put(app.api.frete.toggleFrete)
}