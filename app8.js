// app8_integrador.js

const ordenes = [
    { id: 1, cliente: "Ana", monto: 120000 },
    { id: 2, cliente: "Luis", monto: 80000 },
    { id: 3, cliente: "María", monto: 150000 }
];

const T = {
    verif: 1500,
    proc: 2000,
    reg: 1000,
    notif: 500
};

// ---------------------------------------------------------------------
// FUNCIONES BASE (Todas devuelven Promesas)
// ---------------------------------------------------------------------

function verificar(orden) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`-> [Orden ${orden.id}] Verificación`);
            resolve({ ...orden, verificada: true });
        }, T.verif);
    });
}

function procesar(orden) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`-> [Orden ${orden.id}] Procesamiento`);
            resolve({ ...orden, procesada: true });
        }, T.proc);
    });
}

function registrar(orden) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`-> [Orden ${orden.id}] Registro`);
            resolve({ ...orden, registrada: true });
        }, T.reg);
    });
}

function notificar(orden) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`-> [Orden ${orden.id}] Notificación`);
            resolve({ ...orden, notificada: true });
        }, T.notif);
    });
}


// ---------------------------------------------------------------------
// TAREA 1: CALLBACKS (Solo para una orden)
// ---------------------------------------------------------------------

function procesarOrdenCallbacks(orden, callback) {
    verificar(orden).then(verificada => {
        procesar(verificada).then(procesada => {
            registrar(procesada).then(registrada => {
                notificar(registrada).then(notificada => {
                    callback(null, notificada);
                });
            });
        });
    });
}

console.log("\n--- INICIO: CALLBACKS (Orden 1) ---");
const inicioCB = Date.now();
procesarOrdenCallbacks(ordenes[0], (err, res) => {
    if (err) return console.error(err);
    const t = Date.now() - inicioCB;
    console.log(`\n[Orden ${res.id}] FINALIZADA. Tiempo: ${t}ms`);
    
    // Siguiente paso
    ejecutarPromesas();
});


// ---------------------------------------------------------------------
// TAREA 2: PROMESAS (.then) (Solo para una orden)
// ---------------------------------------------------------------------

function ejecutarPromesas() {
    console.log("\n--- INICIO: PROMESAS (.then) (Orden 2) ---");
    const inicioP = Date.now();
    
    verificar(ordenes[1])
        .then(procesar) 
        .then(registrar) 
        .then(notificar) 
        .then(res => {
            const t = Date.now() - inicioP;
            console.log(`\n[Orden ${res.id}] FINALIZADA. Tiempo: ${t}ms`);
        })
        .catch(error => {
            console.error("Error:", error);
        })
        .finally(() => {
            // Siguiente paso
            procesarTodasSecuencial();
        });
}


// ---------------------------------------------------------------------
// TAREA 3: ASYNC/AWAIT (Secuencial y Paralelo)
// ---------------------------------------------------------------------

// Función que procesa una sola orden secuencialmente
async function procesarOrdenAsync(orden) {
    const inicioOrden = Date.now();
    
    // Await fuerza la secuencia
    const verificada = await verificar(orden);
    const procesada = await procesar(verificada);
    const registrada = await registrar(procesada);
    const notificada = await notificar(registrada);
    
    const tiempoTotal = Date.now() - inicioOrden;
    console.log(`-> [Orden ${orden.id}] Duración: ${tiempoTotal}ms`);
    return notificada;
}

// --- 3A: Procesamiento SECUENCIAL ---
async function procesarTodasSecuencial() {
    console.log("\n--- INICIO: ASYNC/AWAIT SECUENCIAL (Todas) ---");
    const inicioGeneral = Date.now();
    
    // El 'for...of' espera cada orden completa
    for (const orden of ordenes) {
        await procesarOrdenAsync(orden);
    }
    
    const tGeneral = Date.now() - inicioGeneral;
    console.log(`\n### FIN SECUENCIAL. Total: ${tGeneral}ms ###`);
    
    // Siguiente paso
    procesarTodasParalelo();
}

// --- 3B: Procesamiento PARALELO ---
async function procesarTodasParalelo() {
    console.log("\n--- INICIO: ASYNC/AWAIT PARALELO (Todas) ---");
    const inicioGeneral = Date.now();

    // Mapeamos a Promesas
    const promesasOrdenes = ordenes.map(orden => procesarOrdenAsync(orden));

    // Promise.all() espera que la última termine
    await Promise.all(promesasOrdenes);

    const tGeneral = Date.now() - inicioGeneral;
    console.log(`\n### FIN PARALELO. Total: ${tGeneral}ms ###`);
}

// Nota: La ejecución empieza llamando a la cadena de 'procesarOrdenCallbacks'