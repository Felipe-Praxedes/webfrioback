const moment = require('moment')

module.exports = app => {
    const getFrete = (req, res) => {
        const date = req.query.date ? req.query.date
            : moment().endOf('day').toDate()

        app.db('frete')
            .where('id_cliente', (filtro) => {req.user.tipo == 'Empresa' ? req.user.id : '*' } )
            .then(frete => res.json(frete))
            .catch(err => res.status(500).json(err))
    }

    const save = (req, res) => {
        if (!req.body.data_saida.trim()) {
            return res.status(400).send("Descrição é um campo obrigatório")
        }

        req.body.id_cliente = req.user.id
        req.body.empresa = req.user.nome
        req.body.status = 'Aberto'

        app.db('frete')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('frete')
            .where({ id: req.params.id, id_cliente: req.user.id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrada frete com id ${req.params.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const updateFreteStatus = (req, res, status) => {
        app.db('frete')
            .where({ id: req.params.id, id_cliente: req.user.id })
            .update({ status })
            .then(_ => res.status(400).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleFrete = (req, res) => {
        app.db('frete')
            .where({ id: req.params.id, id_cliente: req.user.id })
            .first()
            .then(frete => {
                if (!frete) {
                    const msg = `Frete com id ${req.params.id} não encontrado.`
                    return res.status(400).send(msg)
                }

                const status = frete.status ? null : "Encerrado"
                updateFreteStatus(req, res, status)
            })
            .catch(err => res.status(400).json(err))
    }

    return { getFrete, save, remove, toggleFrete }
}