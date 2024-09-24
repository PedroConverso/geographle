import fs from 'fs';
import { onEvent, startServer } from "soquetic";

let datos = JSON.parse(fs.readFileSync('./data/connections.json', 'utf8'));
let vidas

onEvent("caracteristicasAleatorias", obtenerCaracteristicasAleatorias);

onEvent("verificarSeleccion", (data) => {
    const esCorrecta = verificarSeleccion(data);
    if (!esCorrecta) vidas--;
    return { esCorrecta, vidas };
});

function obtenerCaracteristicasAleatorias() {
    const paisesAleatorios = datos.sort(() => 0.5 - Math.random()).slice(0, 4);
    const caracteristicas = paisesAleatorios.flatMap(pais => 
        pais.words_related
            .sort(() => 0.5 - Math.random()) // Baraja las palabras de cada país
            .slice(0, 4) // Selecciona las primeras 4 palabras
            .map(word => ({
                word,
                country_id: pais.country_id
            }))
    );
    return caracteristicas;
}

function verificarSeleccion(seleccion) {
    vidas = seleccion[1]
    return datos.some(dato => 
        seleccion[0].every(palabra => dato.words_related.includes(palabra))
    );
}


startServer(3000);

