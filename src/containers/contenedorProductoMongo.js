class ContenedorProductoMongo {
    constructor(model) {
        this.model = model
    }

    async save(objet) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.model.create(objet);
                resolve(result._id)
            } catch (err) {
                reject(err)
            }
        })
    }

    async getById(id) {
        const result = await this.model.findOne({ _id: id })
        return result
    }

    async getAll() {
        const result = await this.model.find();
        const products = result.map(elm => ({ title: elm.title, price: elm.price, thumbnail: elm.thumbnail, id: elm._id }));
        return products
    }


    async updateById(objectUpd) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.model.update({ _id: objectUpd.id }, { $set: { title: objectUpd.title, price: objectUpd.price, thumbnail: objectUpd.thumbnail } })
                resolve(result)
            } catch (err) {
                reject(err)
            }
        })
    }

    async deleteById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.model.deleteMany({ _id: id })
                resolve('objeto eliminado')
            } catch (err) {
                reject(err)
            }
        })
    }

    async deleteAll() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.model.deleteMany({})
                resolve('objetos eliminados')
            } catch (err) {
                reject(err)
            }
        })
    }

}

export { ContenedorProductoMongo }