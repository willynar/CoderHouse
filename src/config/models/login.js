import mongoose from "mongoose";

//definir la collecion
const loginCollection = "logins";

//definir el esquema
const loginSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
})

//generamos el modelo
const loginModel = mongoose.model(loginCollection, loginSchema);
export default loginModel 