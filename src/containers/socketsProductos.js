import { ContenedorDaoProductos } from "../daos/index.js";
const productosApi = ContenedorDaoProductos;


class socketsApp {
    constructor(socket, io) {
        this.io = io
        this.socket = socket
    }
    async getProductos() {
        let mensajes = {}
        mensajes.data = await productosApi.getAll()
        this.socket.emit('productos', mensajes)
        this.socket.on('productos', async data => {
            mensajes.push({ socketid: this.socket.id, data: await productosApi.getAll() })
            this.io.sockets.emit('productos', mensajes)
        })
    }

    mensajesChat() {
        let mensajes = []
        mensajes.push("hola mundo")
        this.socket.emit('mensajes', mensajes)
        this.socket.on('mensajes', data => {
            mensajes.push({ socketid: this.socket.id, mensaje: data })
            this.io.sockets.emit('mensajes', mensajes)
        })
    }

    async postProductos() {
        this.socket.on(`nuevosProductos`, async data => {
            let post = await productosApi.save(data)
            let mensajes = {}
            mensajes.data = await productosApi.getAll()
            this.io.sockets.emit('productos', mensajes)
        })
    }

}
let Inicializar = async (socket, io) => {
    const sc = new socketsApp(socket, io)
    sc.mensajesChat()
    await sc.getProductos()
    await sc.postProductos()
}

export default { Inicializar }