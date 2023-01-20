import express from 'express'

const router = express.Router()

import { ContenedorDaoProductos } from "../daos/index.js";
const productosApi = ContenedorDaoProductos;

import { logger } from '../config/logger.js'

let InicializarProductos = async () => {
    await productosApi.save({ title: "Escuadra", price: 251291.32, thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Squadra_45.jpg" })
    await productosApi.save({ title: "Calculadora", price: 251291.32, thumbnail: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Casio_fx-85WA_20050529.jpg" })
    await productosApi.save({ title: "Globo terraqueo", price: 251291.32, thumbnail: "https://upload.wikimedia.org/wikipedia/commons/0/0d/GlobeSK.jpg" })
}

router.get('/', async (req, res) => {
    try {
        res.status(200).json(await productosApi.getAll())
    } catch (error) {
        logger.error(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        res.status(200).json(await productosApi.getById(parseInt(req.params.id)))
    } catch (error) {
        logger.error(error)
    }
})

router.post('/', async (req, res) => {
    try {
        res.status(200).json(await productosApi.save(req.body))
    } catch (error) {
        logger.error(error)
    }
})

router.put('/', async (req, res) => {
    try {
        res.status(200).json(await productosApi.updateById(req.body))
    } catch (error) {
        logger.error(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        res.status(200).json(await productosApi.deleteById(parseInt(req.params.id)))
    } catch (error) {
        logger.error(error)
    }
})

export default { router, InicializarProductos };