// Callback hell - Transformar a promesas

// Función que valida la asistencia 
function AsistenciaLunes(callback) {
    console.log("Asistencia del lunes");
    setTimeout(() => {
        callback(true)
    }, 1000)
}

// Función que toma la asistencia del martes
function AsistenciaMartes(asistencia_lunes, callback) {
    console.log("Asistencia del martes")
    setTimeout(() => {
        callback({dia_lunes : asistencia_lunes, dia_martes : true});
    }, 1000)
}

// Función que toma la asistencia del miercoles
function AsistenciaMiercoles(asistencias, callback) {
    console.log("Asistencia del miercoles");
    setTimeout(() => {
        callback({...asistencias, dia_miercoles : true});
    }, 1000)
}

// Se realiza el llamado de la función
AsistenciaLunes((valor) => {
    AsistenciaMartes(valor, (objeto) => {
        AsistenciaMiercoles(objeto, (Final) => {
            console.log(Final);
        });
    });
});