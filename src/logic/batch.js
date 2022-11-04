import { options } from "./bdConfig.js";
import knex from "knex";

const database = knex(options.mariaDB);
const databaseSqlite = knex(options.sqlLite);

const chat = [
    { email: "prueba@prueba.com", date: new Date(), message: "hola" },
    { email: "otro@prueba.com", date: new Date(), message: "hola" }
];

const productos = [
    { title: "Escuadra", price: 251291.32, thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Squadra_45.jpg" },
    { title: "Calculadora", price: 251291.32, thumbnail: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Casio_fx-85WA_20050529.jpg" },
    { title: "Globo terraqueo", price: 251291.32, thumbnail: "https://upload.wikimedia.org/wikipedia/commons/0/0d/GlobeSK.jpg" },
];

const operationsDb = async () => {
    //validamos si la tablaya existe en la base de datos
    let tableExists = await databaseSqlite.schema.hasTable("chat");
    if (tableExists) {
        await databaseSqlite.schema.dropTable("chat");
    }
    await databaseSqlite.schema.createTable("chat", table => {
        table.increments("id");
        table.string("email", 200).nullable(false);
        table.dateTime("date").nullable(false);
        table.string("message", 300).nullable(false);
    });
    await databaseSqlite('chat').insert(chat);

    tableExists = await database.schema.hasTable("producto");
    if (tableExists) {
        await database.schema.dropTable("producto");
    }
    await database.schema.createTable("producto", table => {
        table.increments("id");
        table.string("title", 200).nullable(false);
        table.decimal("price", 18, 2).nullable(false);
        table.string("thumbnail", 500).nullable(false);
    });
    await database('producto').insert(productos);



    //insertar articulos

    // Listar la tabla mostrando los resultados en la consola
    // const result = await database("chat").select("*");
    // const products = result.map(elm=>({...elm}));
    // console.log(products);

    //Borrar el articulo con id = 3
    // await database('chat').where("id",3).del();

    database.destroy();
    databaseSqlite.destroy();
}
export default { operationsDb }