// app7.js

// La Promesa base que vamos a esperar
function pausaDosSegundos() {
    console.log("Inicio de la pausa la promesa inicio");
    return new Promise((resolve) => {
        // La promesa resuelve el mensaje despues de 2 segundos
        setTimeout(() => {
            resolve("Fin del proceso");
        }, 2000); 
    });
}

// La función async que usa await
async function ejecutarPausa() {
    // Se indica el inicio de la funcion asincrona
    console.log("Inicio de ejecutarPausa()"); 

    // await pausa la ejecucion hasta que la promesa se resuelve
    const resultado = await pausaDosSegundos(); 

    // Esta linea solo se ejecuta DESPUÉS de que pasaron los 2 segundos
    console.log(`Resultado: ${resultado}`);

    // Se indica el fin de la funcion
    console.log("Fin de ejecutarPausa()");
}

// Llamada de la función
ejecutarPausa();

// Mensaje de fin e muestra casi inmediatamente, demostrando que await no bloqueó el hilo principal
console.log("El programa sigue ejecutándose (sin ser bloqueado por el await)");
