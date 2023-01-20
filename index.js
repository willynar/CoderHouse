'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var http = _interopRequireWildcard(_http);

var _socket = require('socket.io');

var socketIo = _interopRequireWildcard(_socket);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _url = require('url');

var _productos = require('./routes/productos.js');

var _productos2 = _interopRequireDefault(_productos);

var _test = require('./routes/test.js');

var _test2 = _interopRequireDefault(_test);

var _chat = require('./routes/chat.js');

var _chat2 = _interopRequireDefault(_chat);

var _login = require('./routes/login.js');

var _login2 = _interopRequireDefault(_login);

var _logout = require('./routes/logout.js');

var _logout2 = _interopRequireDefault(_logout);

var _randoms = require('./routes/randoms.js');

var _randoms2 = _interopRequireDefault(_randoms);

var _Views = require('./routes/Views.js');

var _Views2 = _interopRequireDefault(_Views);

var _socketsProductos = require('./containers/socketsProductos.js');

var _socketsProductos2 = _interopRequireDefault(_socketsProductos);

var _socketsChat = require('./containers/socketsChat.js');

var _socketsChat2 = _interopRequireDefault(_socketsChat);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _login3 = require('./config/models/login.js');

var _login4 = _interopRequireDefault(_login3);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _appConfig = require('./config/appConfig.js');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _cluster = require('cluster');

var _cluster2 = _interopRequireDefault(_cluster);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// obtener argumentos  inicialea
var optionsArgv = {
    alias: {
        m: 'mode',
        p: 'port'
    },
    default: {
        mode: 'FORK',
        port: 8080
    }
};
var objArguments = (0, _minimist2.default)(process.argv.slice(2), optionsArgv);
var modo = objArguments.mode;
var PORT = objArguments.port;

console.log('modo', modo, 'PORT', PORT);

var app = (0, _express2.default)();
var httpServer = new http.createServer(app);
var io = new socketIo.Server(httpServer);
var __filename = (0, _url.fileURLToPath)(process.argv[1]);
var __dirname = _path2.default.dirname(__filename);


_mongoose2.default.connect(_appConfig.options.MongoDB.Url, _appConfig.options.MongoDB.options, function (error) {
    if (error) throw new Error('connection failed ' + error);
    console.log("conexion exitosa");
});

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));

app.use(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, req, res, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log(err.stack);
                        res.status(500).send('Something broke!');

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
    };
}());

app.engine('hbs', _expressHandlebars2.default.engine({
    extname: '.hbs',
    defaultLayout: process.env.HBS_DEFAULT_LAYOUT,
    layoutsDir_dirname: '/views/layouts',
    partialsDir_dirname: '/views/partials'
}));

app.set('view engine', 'hbs');
app.set('views', './views');

app.use(_express2.default.static(__dirname + '/public'));

app.set('socketio', io);

if (modo === 'CLUSTER' && _cluster2.default.isPrimary) {
    for (var index = 0; index < _appConfig.options.infoApp.procesors; index++) {
        _cluster2.default.fork();
    }
    _cluster2.default.on('exit', function (worker) {
        console.log('e\xF1 subproceso ' + worker.process.pid + ' fallo');
    });
} else {
    httpServer.listen(PORT, _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        console.log('Servidor Http escuchando en el puerto ' + httpServer.address().port + ' on process ' + process.pid);
                        // await productos.InicializarProductos()
                        // await chats.InicializarChat()
                        _context2.next = 3;
                        return _login2.default.InicializarLogin();

                    case 3:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    })));

    httpServer.on('error', function (error) {
        return console.log('Error en servidor ' + error);
    });

    io.on('connection', function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(socket) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _socketsProductos2.default.Inicializar(socket, io);

                        case 2:
                            _context3.next = 4;
                            return _socketsChat2.default.Inicializar(socket, io);

                        case 4:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function (_x5) {
            return _ref3.apply(this, arguments);
        };
    }());
}
app.use((0, _cookieParser2.default)());

app.use((0, _expressSession2.default)({
    store: _connectMongo2.default.create({
        mongoUrl: _appConfig.options.MongoDB.UrlSession
    }),
    secret: "llavesecreta",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
}));

app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

_passport2.default.serializeUser(function (user, done) {
    done(null, user.id);
});

_passport2.default.deserializeUser(function (id, done) {
    _login4.default.findById(id, function (err, userFound) {
        if (err) return done(err);
        return done(null, userFound);
    });
});

var createHash = function createHash(password) {
    var hash = _bcrypt2.default.hashSync(password, _bcrypt2.default.genSalt(10));
    return hash;
};

_passport2.default.use("signupStrategy", new _passportLocal.Strategy({ passReqToCallback: true, usernameField: "username" }, function (req, username, password, done) {
    //logica para registrar al usuaurio
    //verificar si el usuario exitse en db
    _login4.default.findOne({ username: username }, function (error, userFound) {
        if (error) return done(error, null, { message: "Hubo un error" });
        if (userFound) return done(null, userFound, { message: "El usuario ya existe" });
        //guardamos el usuario en la db
        var newUser = {
            name: req.body.name,
            username: username,
            password: password
        };
        _login4.default.create(newUser, function (error, userCreated) {
            if (error) return done(error, null, { message: "Hubo un error al registrar el usuario" });
            return done(null, userCreated);
        });
    });
}));

app.post("/singup", _passport2.default.authenticate("signupStrategy", {
    failureRedirect: "/erroPage",
    failureMessage: true
}), function (req, res) {
    res.redirect("/home");
});
app.use('/api/productos-test', _test2.default.router);
app.use('/productos', _productos2.default.router);
app.use('/chat', _chat2.default.router);
app.use('/login', _login2.default.router);
app.use('/logout', _logout2.default.router);
app.use('/api/randoms', _randoms2.default.router);
app.use('/', _Views2.default.router);
