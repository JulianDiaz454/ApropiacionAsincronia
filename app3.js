// Función que simula procesar un pedido
function procesarPedido(callback) {
    // Variable para aprobar el proceso
    let aprobado = true;
    setTimeout(() => {
        if (aprobado) {
            return callback("Se entrego el pedido");
        } else {
            return callback("Fallo en entregar el pedido");
        }
    }, 3000)
}

// Callback que mostrara el mensaje
procesarPedido((respuesta) => {
    console.log(`Respuesta: ${respuesta}`);
})
