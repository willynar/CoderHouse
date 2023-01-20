import { ContenedorProducto } from "../../containers/contenedorProducto.js";

//crear una subclases de carritos  que trabaje con el contendor Archivos
class productosDaoArchivos extends ContenedorProducto{
    constructor(filename){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(filename);
    }
}

export {productosDaoArchivos}