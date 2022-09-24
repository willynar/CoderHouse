const express = require('express');
const Contenedor = require('./Clase2/contenedor');
const app = express()


const PORT = 8080
const cont = new Contenedor('Clase2/productos')

const server = app.listen(PORT, async () => {
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}`)
    await InicializarProductos()
})

server.on('error', error => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) => {
    res.send({ mensaje: 'hola mundo' })
})

app.get('/productos', async (req, res) => {

    res.send(await cont.getAll())
})

app.get('/productoRamdom', async (req, res) => {
    let indiceRamdom = parseInt(Math.random() * (3) + 1);
    res.send(await cont.getById(indiceRamdom))
})



let InicializarProductos = async () => {
    await cont.save({ title: "Escuadra", price: 251291.32, thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Squadra_45.jpg", id: 0 })
    await cont.save({ title: "Calculadora", price: 251291.32, thumbnail: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Casio_fx-85WA_20050529.jpg", id: 0 })
    await cont.save({ title: "Globo terraqueo", price: 251291.32, thumbnail: "https://upload.wikimedia.org/wikipedia/commons/0/0d/GlobeSK.jpg", id: 0 })
}