import knex from "knex";

class Contenedor {
    constructor(options, table) {
        this.database = knex(options);
        this.table = table
    }

    async save(objet) {
        return new Promise(async (resolve, reject) => {
            try {
                let [id] = await this.database.from(this.table).insert({ title: objet.title, price: objet.price, thumbnail: objet.thumbnail });
                resolve(id)
            } catch (err) {
                reject(err)
            }
        })
    }

    async getById(id) {
        const result = await this.database.from(this.table).select("*").where("id", id);
        const products = result.map(elm => ({ ...elm }));
        return products[0]
    }

    async getAll() {
        const result = await this.database.from(this.table).select("*");
        const products = result.map(elm => ({ ...elm }));
        return products
    }


    async updateById(objectUpd) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.database.from(this.table).where("id", objectUpd.id).update({ title: objectUpd.title, price: objectUpd.price, thumbnail: objectUpd.thumbnail });
                resolve(objectUpd)
            } catch (err) {
                reject(err)
            }
        })
    }

    async deleteById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.database.from(this.table).where("id", id).del();
                resolve('objeto eliminado')
            } catch (err) {
                reject(err)
            }
        })
    }

    async deleteAll() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.database.from(this.table).del();
                resolve('objeto eliminado')
            } catch (err) {
                reject(err)
            }
        })
    }

}

export default Contenedor