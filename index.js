const express = require('express');
const productos = require('./routes/productos')
const productosNoRest = require('./routes/productosNoRest')
const app = express()
const handlebars = require('express-handlebars')
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(async function (err, req, res, next) {
    console.log(err.stack)
    res.status(500).send('Something broke!')
})

app.engine('hbs',
    handlebars.engine({
        extname:'.hbs',
        defaultLayout:'index.hbs',
        layoutsDir_dirname:'/views/layouts',
        partialsDir_dirname:'/views/partials'
    })
)
app.set('view engine', 'hbs')
app.set('views', './views')

const server = app.listen(PORT, async () => {
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}`)
    await productos.InicializarProductos()
})

server.on('error', error => console.log(`Error en servidor ${error}`))

// app.use(express.static('public'))
app.use('/productos', productos.router)
app.use('/', productosNoRest.router)
