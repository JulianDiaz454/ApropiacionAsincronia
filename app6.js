// app6.js

// Funcion que puede fallar o no
function procesoAleatorio() {
    
    // Devolvemos la promesa
    return new Promise((resolve, reject) => {
        
        // Simulamos un retraso de 2 segundos
        setTimeout(() => {
            
            // Decidimos si falla o no
            const resultado = Math.random() > 0.5;

            if (resultado) {
                // Se ejecuta si hay exito
                resolve("Proceso OK");
            } else {
                // Se ejecuta si hay fallo
                reject("Error: Proceso fallido");
            }

        }, 2000); 
    });
}

// Llamada a la funcion
procesoAleatorio()
    // El .then se ejecuta si todo salio bien
    .then((respuesta) => {
        console.log(`Mensaje: ${respuesta}`);
    })
    // El .catch se ejecuta si hubo un reject o un error
    .catch((error) => {
        console.error(`Fallo detectado: ${error}`);
    });

// Toca ejecutarlo varias veces para ver los dos resultados (OK y Fallo).