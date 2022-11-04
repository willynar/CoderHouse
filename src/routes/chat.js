import express from 'express'
import { options } from "../logic/bdConfig.js";
const router = express.Router()

import contenedorChat from '../logic/contenedorChat.js'
const cont = new contenedorChat(options.sqlLite,'chat')

router.get('/', async (req, res) => {
    res.status(200).json(await cont.getAll())
})

router.post('/', async (req, res) => {
    res.status(200).json(await cont.save(req.body))
})

export default { router };