import express from 'express'
const router = express.Router()

import { ContenedorDaoChats } from "../daos/index.js";
const chatApi = ContenedorDaoChats;

import { logger } from '../config/logger.js'

let InicializarChat = async () => {
    await chatApi.save({ id: 0, author: { email: "willynargame@gmail.com", nombre: "willy", apellido: "naranjo", edad: 21, alias: "Willynar", avatar: "https://www.pngmart.com/files/12/Boy-Emoji-Avatar-PNG.png" }, text: "hola", date: "2022-11-25T16:32:35.768Z" })
    await chatApi.save({ id: 0, author: { email: "juanita@gmail.com", nombre: "juanita", apellido: "ardila", edad: 21, alias: "juanita", avatar: "https://www.pngmart.com/files/12/Cute-Hair-Girl-Emoji-PNG-Pic.png" }, text: "hola", date: "2022-11-25T16:33:35.768Z" })
}

router.get('/', async (req, res) => {
    try {
        res.status(200).json(await chatApi.getAll())
    } catch (error) {
        logger.error(error)
    }
})

router.post('/', async (req, res) => {
    try {
        res.status(200).json(await chatApi.save(req.body))
    } catch (error) {
        logger.error(error)
    }
})

export default { router, InicializarChat };