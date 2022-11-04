import express from 'express'
const router = express.Router()
import { options } from "../logic/bdConfig.js";
import Contenedor from '../logic/contenedor.js'
const cont = new Contenedor(options.mariaDB,'producto')

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

export default { router };