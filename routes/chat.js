const express = require('express')
const router = express.Router()

const contenedorChat = require('../logic/contenedorChat')
const cont = new contenedorChat('chat')


let InicializarChat = async () => {
    await cont.save({ email: "prueba@prueba.com", date: new Date(), message: "hola", id: 0 })
    await cont.save({ email: "otro@prueba.com", date: new Date(), message: "hola", id: 0 })
}

router.get('/', async (req, res) => {
    res.status(200).json(await cont.getAll())
})

router.post('/', async (req, res) => {
    res.status(200).json(await cont.save(req.body))
})

module.exports = {router,InicializarChat};