import { ContenedorChat } from "../../containers/contenedorChat.js";

//crear una subclases de carritos  que trabaje con el contendor Archivos
class chatDaoArchivos extends ContenedorChat{
    constructor(filename){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(filename);
    }
}

export {chatDaoArchivos}