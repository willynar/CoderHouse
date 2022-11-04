export const options = {
    mariaDB: {
        //con que gestor de base de datos me voy a conectar
        client: "mysql",
        //toda la informacion de la base de datos para conectarnos
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "dbpruebas"
        }
    },
    sqlLite: {
        //con que gestor de base de datos me voy a conectar
        client: "sqlite",
        //toda la informacion de la base de datos para conectarnos
        connection: {
            filename: './database/dbpruebas.sqlite'
        },
        useNullAsDefault: true
    }
}

export default { options }