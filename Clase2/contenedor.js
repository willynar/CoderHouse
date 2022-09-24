const fs = require('fs');
class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
        this.extencion = '.txt'
        fs.createWriteStream(`./${this.nombreArchivo}${this.extencion}`, 'utf-8')
    }

    async save(objet) {
        let array = []
        await fs.promises.readFile(`./${this.nombreArchivo}${this.extencion}`, 'utf-8')
            .then(async result => {
                let ultimoId = 0;
                //se valida si tiene contenido el archivo y convierte contenido a json array
                if (result) {
                    array = JSON.parse(result)
                    array.forEach(element => {
                        ultimoId = element.id;
                    })
                } else {
                    array = []
                }
                objet.id = ++ultimoId;
                array.push(objet)
                try {
                    await fs.promises.writeFile(`./${this.nombreArchivo}${this.extencion}`, JSON.stringify(array))
                } catch (err) {
                    console.log(err)
                }
            })
            .catch(err => {
                console.log(err)
            })
        return objet.id
    }

    async getById(id) {
        let objet
        await fs.promises.readFile(`./${this.nombreArchivo}${this.extencion}`, 'utf-8')
            .then(result => {
                if (result) {
                    let array = JSON.parse(result)
                    array.forEach(x => {
                        if (x.id == id)
                            objet = x
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        //se valida si el objeto si existe
        if (objet === undefined) {
            return null
        } else {
            return objet
        }
    }

    async getAll() {
        let array = []
        await fs.promises.readFile(`./${this.nombreArchivo}${this.extencion}`, 'utf-8')
            .then(async result => {
                //se valida que ayan datos
                if (result) {
                    array = JSON.parse(result)
                }
            })
            .catch(err => {
                console.log(err)
            })

        return array
    }

    async deleteById(id) {
        return new Promise(async (resolve, reject) => {
            let objeto = await this.getById(id);
            //se valida que el ojeto exista
            if (objeto) {
                let array = await this.getAll()
                array.shift(objeto)
                try {
                    await fs.promises.writeFile(`./${this.nombreArchivo}${this.extencion}`, JSON.stringify(array))
                    resolve('objeto eliminado')
                } catch (err) {
                    reject(err)
                }
            } else {
                resolve('no existe el objeto en el archivo')
            }
        })
    }

   async deleteAll() {
        return new Promise(async (resolve, reject) => {
            try {
                await fs.promises.writeFile(`./${this.nombreArchivo}${this.extencion}`, '')
                resolve('objetos eliminados')
            } catch (err) {
                reject(err)
            }
        })
    }

}

module.exports = Contenedor
// let contenedorDeProductos = new Contenedor("productos")
// let prueba = async () => {
//     console.log(await contenedorDeProductos.save({ title: "papa", price: 251291.32, thumbnail: "https://www.infobae.com/new-resizer/rJPvFqJ0gbw7oH7lWvfGwJxcN3A=/992x606/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/E7U6CHWZRBFCPN2ESFNKXYFO4U.jpeg", id: 0 }))// console.log(contenedor.getId(1))
    
//     console.log(await contenedorDeProductos.save({ title: "yuca", price: 251291.32, thumbnail: "https://www.infobae.com/new-resizer/rJPvFqJ0gbw7oH7lWvfGwJxcN3A=/992x606/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/E7U6CHWZRBFCPN2ESFNKXYFO4U.jpeg", id: 0 }))// console.log(contenedor.getId(1))
    
//     console.log(await contenedorDeProductos.getById(1))

//     console.log(await contenedorDeProductos.getAll())

//     await contenedorDeProductos.deleteById(1)
//         .then(console.log)
//         .catch(console.log)

//     console.log(await contenedorDeProductos.getAll())

//     await contenedorDeProductos.deleteAll()
//         .then(console.log)
//         .catch(console.log)

//     console.log(await contenedorDeProductos.getAll())
// }

// prueba()