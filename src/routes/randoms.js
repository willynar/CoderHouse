import express from 'express'
const router = express.Router()
import { fork } from "child_process";

//ruta no bloqueante
router.get("/", (req, res) => {
    const child = fork("./src/containers/contenedorChild.js");
    //recibimos mensajes del proceso hijo
    child.on("message", (childMsg) => {
      if (childMsg === "listo") {
        //recibimos notificacion del proceso hijo, y le mandamos un mensaje para que comience a operar.
        child.send("Iniciar")
      } else {
        res.json({ resultado: childMsg })
      }
    });

});

//ruta no bloqueante
router.get("/:cant", (req, res) => {
    const child = fork("./src/containers/contenedorChild.js");
    //recibimos mensajes del proceso hijo
    child.on("message", (childMsg) => {
      if (childMsg === "listo") {
        //recibimos notificacion del proceso hijo, y le mandamos un mensaje para que comience a operar.
        child.send(parseInt(req.params.cant))
      } else {
        res.json({ resultado: childMsg })
      }
    });
});

export default { router };
