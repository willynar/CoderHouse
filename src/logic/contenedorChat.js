import knex from "knex";

class contenedorChat {
    constructor(options, table) {
        this.database = knex(options);
        this.table = table
    }

    async save(objet) {
        return new Promise(async (resolve, reject) => {
            try {
                let [id] = await this.database.from(this.table).insert({ email: objet.email, date: objet.date, message:objet.message});
                resolve(id)
            } catch (err) {
                reject(err)
            }
        })
    }

    async getAll() {
        const result = await this.database.from(this.table).select("*");
        const chats = result.map(elm => ({ ...elm }));
        return chats
    }
}

export default contenedorChat