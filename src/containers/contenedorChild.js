//solo cuando trabajemos con modulos de es6
process.send("listo"); //proceso hijo listo para trabajar

////recibimos los mensajes del proceso padre.
process.on("message", (parentMsg) => {
    console.log(parentMsg)
    // console.log("parentMsg", parentMsg);
    if (parentMsg === "Iniciar") {
        let array = Array(100000000).fill().map(() => Math.round(Math.random() * 9));
        console.log(array)
        let repetidos = {};
        array.forEach(function (numero) {
            repetidos[numero] = (repetidos[numero] || 0) + 1;
        });
        //enviamos el resultado de la operacion del proceso hijo al proceso padre
        process.send(repetidos);
    } else {
        let array = Array(parentMsg).fill().map(() => Math.round(Math.random() * 9));
        let repetidos = {};
        array.forEach(function (numero) {
            repetidos[numero] = (repetidos[numero] || 0) + 1;
        });
        //enviamos el resultado de la operacion del proceso hijo al proceso padre
        process.send(repetidos);
    }
})