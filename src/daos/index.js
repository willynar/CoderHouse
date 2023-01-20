import { options } from "../config/appConfig.js";
import mongoose from "mongoose";
import productosModel from "../config/models/productos.js";
import chatModel from "../config/models/chat.js";
import loginModel from "../config/models/login.js";

//identificador
let databaseType = "mongo";

let ContenedorDaoProductos;
let ContenedorDaoChats;
let ContenedorDaoLogins;


switch (databaseType) {

    case "archivos":
        const { productosDaoArchivos } = await import("./productos/productosDao.js");
        const { chatDaoArchivos } = await import("./chat/chatDao.js");
        // const { loginDaoArchivos } = await import("./login/loginDao.js");
        ContenedorDaoProductos = new productosDaoArchivos(options.fileSystem.pathProducts);
        ContenedorDaoChats = new chatDaoArchivos(options.fileSystem.pathChats);
        // ContenedorDaoLogins = new loginDaoArchivos(options.fileSystem.pathLogin);
        break;
    case "sql":
        // const {ProductosDaoSQL} = await import("./products/productsSql.js");
        // const {CarritosDaoSQL} = await import("./carts/cartsSql.js");
        // ContenedorDaoProductos = new ProductosDaoSQL(options.sqliteDB, "productos");
        // ContenedorDaoCarritos = new CarritosDaoSQL(options.sqliteDB,"carritos");
        break;
    case "mongo":
        mongoose.connect(options.MongoDB.Url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, error => {
            if (error) throw new Error(`connection failed ${error}`);
            console.log("conexion exitosa")
        })
        const { productosDaoMongo } = await import("./productos/productosDaoMongo.js");
        const { chatDaoMongo } = await import("./chat/chatDaoMongo.js");
        const { loginDaoMongo } = await import("./login/loginDaoMongo.js");
        ContenedorDaoProductos = new productosDaoMongo(productosModel);
        ContenedorDaoChats = new chatDaoMongo(chatModel);
        ContenedorDaoLogins = new loginDaoMongo(loginModel);
        break;
}

export { ContenedorDaoProductos, ContenedorDaoChats, ContenedorDaoLogins }