// app5.js

// Función 1: AsistenciaLunes ahora devuelve una Promesa
function AsistenciaLunes() {
    console.log("Asistencia del lunes");
    return new Promise((resolve, reject) => {
        // Le dimos 1s de retraso como en el original
        setTimeout(() => {
            // En lugar de callback(true), usamos resolve(true)
            resolve(true); 
        }, 1000);
    });
}

// Función 2: Recibe el valor del lunes y devuelve OTRA Promesa
function AsistenciaMartes(asistencia_lunes) {
    console.log("Asistencia del martes");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Resolvemos con el objeto de asistencias
            resolve({
                dia_lunes: asistencia_lunes,
                dia_martes: true
            });
        }, 1000);
    });
}

// Función 3: Recibe el objeto y devuelve la Promesa final
function AsistenciaMiercoles(asistencias) {
    console.log("Asistencia del miercoles");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Actualizamos el objeto con el Spread Operator (...)
            resolve({
                ...asistencias,
                dia_miercoles: true
            });
        }, 1000);
    });
}