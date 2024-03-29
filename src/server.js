import express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';
import path from 'path';
import productos from './routes/productos.js'
import productosTest from './routes/test.js'
import chats from './routes/chat.js'
import login from './routes/login.js'
import logout from './routes/logout.js'
import randoms from './routes/randoms.js'
import vistasHandlebars from './routes/Views.js'
import socketsAPP from './containers/socketsProductos.js'
import socketsAPPChat from './containers/socketsChat.js'
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import loginModel from "./config/models/login.js"
import mongoose from "mongoose"
import { options } from "./config/appConfig.js";
import bcrypt from "bcrypt";
import parseArgs from 'minimist';
import cluster from 'cluster'
import { logger } from './config/logger.js'
import compression from 'compression'

// obtener argumentos  inicialea
const optionsArgv = {
    alias: {
        m: 'mode',
        p: 'port'
    },
    default: {
        mode: 'FORK',
        port: process.env.PORT || 8080
    }
}

const objArguments = parseArgs(process.argv.slice(2), optionsArgv)
const modo = objArguments.mode
const PORT = objArguments.port

logger.warn('modo', modo, 'PORT', PORT)

const app = express()
const httpServer = new http.createServer(app)
const io = new socketIo.Server(httpServer)

// para  nginx
// const __filename = fileURLToPath(import.meta.url);
// para babel
// const __filename = fileURLToPath(process.argv[1]);
const __filename = process.argv[1];
const __dirname = path.dirname(__filename);

import handlebars from 'express-handlebars'

mongoose.connect(options.MongoDB.Url, options.MongoDB.options, error => {
    if (error) throw new Error(`connection failed ${error}`);
    logger.info("conexion exitosa")
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(async function (err, req, res, next) {
    logger.error(err.stack)
    res.status(500).send('Something broke!')
})

app.engine('hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: process.env.HBS_DEFAULT_LAYOUT,
        layoutsDir_dirname: '/views/layouts',
        partialsDir_dirname: '/views/partials'
    })
)

app.set('view engine', 'hbs')
// // app.set('views', './views')
app.set('views', `${__dirname}/views`);

app.use(express.static(__dirname + '/public'))

app.set('socketio', io);

if (modo === 'CLUSTER' && cluster.isPrimary) {
    for (let index = 0; index < options.infoApp.procesors; index++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        logger.error(`el subproceso ${worker.process.pid} fallo`)
    })
} else {
    httpServer.listen(PORT, async () => {
        logger.trace(`Servidor Http escuchando en el puerto ${httpServer.address().port} on process ${process.pid}`)
        // await productos.InicializarProductos()
        // await chats.InicializarChat()
        await login.InicializarLogin()
    })

    httpServer.on('error', error => logger.error(`Error en servidor ${error}`))

    io.on('connection', async (socket) => {
        await socketsAPP.Inicializar(socket, io)
        await socketsAPPChat.Inicializar(socket, io)
    })
}

app.use(cookieParser());

app.use(session({
    store: MongoStore.create({
        mongoUrl: options.MongoDB.UrlSession
    }),
    secret: "llavesecreta",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    loginModel.findById(id, (err, userFound) => {
        if (err) return done(err)
        return done(null, userFound)
    })
})

const createHash = (password) => {
    const hash = bcrypt.hashSync(password, bcrypt.genSalt(10))
    return hash;
}

passport.use("signupStrategy", new LocalStrategy({ passReqToCallback: true, usernameField: "username" }, (req, username, password, done) => {
    //logica para registrar al usuaurio
    //verificar si el usuario exitse en db
    loginModel.findOne({ username: username }, (error, userFound) => {
        if (error) return done(error, null, { message: "Hubo un error" });
        if (userFound) return done(null, userFound, { message: "El usuario ya existe" });
        //guardamos el usuario en la db
        const newUser = {
            name: req.body.name,
            username: username,
            password: password
        };
        loginModel.create(newUser, (error, userCreated) => {
            if (error) return done(error, null, { message: "Hubo un error al registrar el usuario" })
            return done(null, userCreated);
        })
    })
}));




app.post("/singup", passport.authenticate("signupStrategy", {
    failureRedirect: "/erroPage",
    failureMessage: true
}), (req, res) => {
    res.redirect("/home")
})


const logUrlsInfo = function (req, res, next) {
    logger.info(`ruta /${req.originalUrl} . Metodo /${req.method}`)
    next()
}

app.use(compression())
app.use('/api/productos-test', logUrlsInfo, productosTest.router)
app.use('/productos', logUrlsInfo, productos.router)
app.use('/chat', logUrlsInfo, chats.router)
app.use('/login', logUrlsInfo, login.router)
app.use('/logout', logUrlsInfo, logout.router)
app.use('/api/randoms', logUrlsInfo, randoms.router)
app.use('/', logUrlsInfo, vistasHandlebars.router)

//rutas no implementadas
app.get('*', function (req, res) {
    logger.warn(`ruta /${req.originalUrl} no implementada. Metodo /${req.method}`)
    res.status(404).send(JSON.stringify({ error: 404, descripcion: `ruta /${req.originalUrl} no implementada. Metodo /${req.method}` }));
});
app.post('*', function (req, res) {
    logger.warn(`ruta /${req.originalUrl} no implementada. Metodo /${req.method}`)
    res.status(404).send(JSON.stringify({ error: 404, descripcion: `ruta /${req.originalUrl} no implementada. Metodo /${req.method}` }));
});
app.put('*', function (req, res) {
    logger.warn(`ruta /${req.originalUrl} no implementada. Metodo /${req.method}`)
    res.status(404).send(JSON.stringify({ error: 404, descripcion: `ruta /${req.originalUrl} no implementada. Metodo /${req.method}` }));
});
app.delete('*', function (req, res) {
    logger.warn(`ruta /${req.originalUrl} no implementada. Metodo /${req.method}`)
    res.status(404).send(JSON.stringify({ error: 404, descripcion: `ruta /${req.originalUrl} no implementada. Metodo /${req.method}` }));
});