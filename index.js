const express = require('express')
const productos = require('./routes/productos')

const app = express()
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(async function (err, req, res, next) {
    console.log(err.stack)
    res.status(500).send('Something broke!')
})

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.status(200).redirect('index.html')
})


const server = app.listen(PORT, async () => {
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}`)
    await productos.InicializarProductos()
})

server.on('error', error => console.log(`Error en servidor ${error}`))

app.use('/api/productos', productos.router)

//EJEMPLO PARA ACTUALIZAR 
// { title: "updated", price: 2332.32, thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/3c/updated.jpg", id: 2 }
