import fs from 'fs';
class contenedorChat {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
        this.extencion = '.txt'
        if (!fs.existsSync(`./${this.nombreArchivo}${this.extencion}`)) {
            fs.createWriteStream(`./${this.nombreArchivo}${this.extencion}`, 'utf-8')
        }
    }

    async save(objet) {
        if (fs.existsSync(`./${this.nombreArchivo}${this.extencion}`)) {
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
                        reject(err)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            return objet.id
        } else {
            return 'No existe el archivo'
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
}

export default contenedorChat