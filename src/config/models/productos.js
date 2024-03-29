import mongoose from "mongoose";

//definir la collecion
const productosCollection = "productos";

//creamos el esquema de los documentos estudiantes
const productoSchema = new mongoose.Schema(
    {
        title:String,
        price:Number,
        thumbnail:String
    }
);

//generar un modelo, que nos va a permitir operaciones sobre los documentos.
const productosModel = mongoose.model(productosCollection, productoSchema);
export default productosModel 