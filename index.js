const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const productos = require('./routes/productos')
const chats = require('./routes/chat')
const vistasHandlebars = require('./routes/Views')
const socketsAPP = require('./logic/sockets')
const socketsAPPChat = require('./logic/socketsChat')



const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const handlebars = require('express-handlebars');
const PORT = 8080




app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(async function (err, req, res, next) {
    console.log(err.stack)
    res.status(500).send('Something broke!')
})

app.engine('hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir_dirname: '/views/layouts',
        partialsDir_dirname: '/views/partials'
    })
)
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.static(__dirname + '/public'))

app.set('socketio', io);

httpServer.listen(PORT, async () => {
    console.log(`Servidor Http escuchando en el puerto ${httpServer.address().port}`)
    await productos.InicializarProductos()
    await chats.InicializarChat()
})

io.on('connection',  async (socket) => {
   await socketsAPP.Inicializar(socket, io)
   await socketsAPPChat.Inicializar(socket, io)

})

httpServer.on('error', error => console.log(`Error en servidor ${error}`))

app.use('/productos', productos.router)
app.use('/chat', chats.router)
app.use('/', vistasHandlebars.router)
