import express from 'express'
const router = express.Router()

import Contenedor from '../logic/contenedor.js'
const cont = new Contenedor('productos')


let InicializarProductos = async () => {
    await cont.save({ title: "Escuadra", price: 251291.32, thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Squadra_45.jpg", id: 0 })
    await cont.save({ title: "Calculadora", price: 251291.32, thumbnail: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Casio_fx-85WA_20050529.jpg", id: 0 })
    await cont.save({ title: "Globo terraqueo", price: 251291.32, thumbnail: "https://upload.wikimedia.org/wikipedia/commons/0/0d/GlobeSK.jpg", id: 0 })
}

router.get('/', async (req, res) => {
    res.status(200).json(await cont.getAll())
})

router.get('/:id', async (req, res) => {
    res.status(200).json(await cont.getById(parseInt(req.params.id)))
})

router.post('/', async (req, res) => {
    res.status(200).json(await cont.save(req.body))
})

router.put('/', async (req, res) => {
    res.status(200).json(await cont.updateById(req.body))
})

router.delete('/:id', async (req, res) => {
    res.status(200).json(await cont.deleteById(parseInt(req.params.id)))
})

export default { router, InicializarProductos };