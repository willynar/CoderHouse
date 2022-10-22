import express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import productos from './routes/productos.js'
import chats from './routes/chat.js'
import vistasHandlebars from './routes/Views.js'
import socketsAPP from './logic/sockets.js'
import socketsAPPChat from './logic/socketsChat.js'



const app = express()
const httpServer = new http.createServer(app)
const io = new socketIo.Server(httpServer)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import handlebars from 'express-handlebars'
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

io.on('connection', async (socket) => {
    await socketsAPP.Inicializar(socket, io)
    await socketsAPPChat.Inicializar(socket, io)

})

httpServer.on('error', error => console.log(`Error en servidor ${error}`))

app.use('/productos', productos.router)
app.use('/chat', chats.router)
app.use('/', vistasHandlebars.router)
