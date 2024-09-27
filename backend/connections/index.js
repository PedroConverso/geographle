import fs from 'fs';
import { onEvent, sendEvent, startServer } from "soquetic";

let datos = JSON.parse(fs.readFileSync('./data/connections.json', 'utf8'));
let vidas;

// Manejar el evento para obtener características aleatorias
onEvent("caracteristicasAleatorias", obtenerCaracteristicasAleatorias);

// Manejar el evento para verificar la selección de palabras
onEvent("verificarSeleccion", (data) => {
    const esCorrecta = verificarSeleccion(data);
    if (!esCorrecta) vidas--;
    return { esCorrecta, vidas };
});

// Manejar el evento para guardar estadísticas
onEvent("guardarEstadisticas", (estadisticas) => {
    console.log("Estadísticas recibidas:", estadisticas);
    
    // Guardar las estadísticas en un archivo JSON
    fs.appendFileSync('./data/estadisticas.json', JSON.stringify(estadisticas) + '\n', 'utf8');
    
    return { success: true };
});

// Función para obtener características aleatorias de los países
function obtenerCaracteristicasAleatorias() {
    const paisesAleatorios = datos.sort(() => 0.5 - Math.random()).slice(0, 4);
    const caracteristicas = paisesAleatorios.flatMap(pais => 
        pais.words_related
            .sort(() => 0.5 - Math.random()) // Barajar las palabras de cada país
            .slice(0, 4) // Seleccionar las primeras 4 palabras
            .map(word => ({
                word,
                country_id: pais.country_id
            }))
    );
    return caracteristicas;
}

// Función para verificar si las palabras seleccionadas son correctas
function verificarSeleccion(seleccion) {
    vidas = seleccion[1];
    return datos.some(dato => 
        seleccion[0].every(palabra => dato.words_related.includes(palabra))
    );
}


startServer(3000);
console.log(`Servidor Geographle Connections iniciado en el puerto 3000`);
