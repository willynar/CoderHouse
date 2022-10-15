const express = require('express')
const router = express.Router()
const http = require('http')

router.get('/', async (req, res) => {
    res.render('main', { layout: 'guardar' })
})

router.get('/cargados/', async (req, res) => {
    // let result = undefined
    let request = await http.get('http://localhost:8080/productos', (ress) => {
        ress.setEncoding('utf8');
        ress.on('data', function (chunk) {
            console.log(JSON.parse(chunk));
        
            res.render('main', { layout: 'productos', lista: JSON.parse(chunk) })
        });

    })
    request.end()
})






module.exports = { router };