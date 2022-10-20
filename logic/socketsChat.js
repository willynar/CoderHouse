const http = require('http')
const request = require('request');

class socketsApp {
    constructor(socket, io) {
        this.io = io
        this.socket = socket
    }
    async getChats() {
        let http_promise = this.getPromiseChat()
        let mensajes = {}
        mensajes.data = await http_promise
        this.socket.emit('chat', mensajes)
        this.socket.on('chat', async data => {
            mensajes.push({ socketid: this.socket.id, data: await http_promise })
            this.io.sockets.emit('chat', mensajes)
        })
    }
    async postChats() {
        this.socket.on(`nuevosChats`, async data => {
            let http_promisePost = this.postPromiseProduct(data)
            console.log(await http_promisePost)
            let http_promise = this.getPromiseChat()
            let mensajes = {}
            mensajes.data = await http_promise
            this.io.sockets.emit('chat', mensajes)
        })
    }

    postPromiseProduct(data) {
        return new Promise((resolve, reject) => {
            const options = {
                url: 'http://localhost:8080/chat',
                json: true,
                body: data
            };
            request.post(options, (err, res, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        });
    }

    getPromiseChat() {
        return new Promise((resolve, reject) => {
            http.get('http://localhost:8080/chat', (response) => {
                let chunks_of_data = [];
                response.on('data', (fragments) => {
                    chunks_of_data.push(fragments);
                });
                response.on('end', () => {
                    let response_body = Buffer.concat(chunks_of_data);
                    resolve(JSON.parse(response_body));
                });
                response.on('error', (error) => {
                    reject(error);
                });
            });
        });
    }
}
let Inicializar = async (socket, io) => {
    const sc = new socketsApp(socket, io)
    await sc.getChats()
    await sc.postChats()
}

module.exports = { Inicializar }