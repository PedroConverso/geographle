import fs from 'fs';
import { onEvent, startServer } from "soquetic";

let datos = JSON.parse(fs.readFileSync('../proyecto-3-geographle/data/connections.json', 'utf8'));
let vidas = 5;

onEvent("caracteristicasAleatorias", obtenerCaracteristicasAleatorias);

onEvent("verificarSeleccion", (data) => {
    const esCorrecta = verificarSeleccion(data.seleccion);
    if (!esCorrecta) vidas--;
    return { esCorrecta, vidas };
});

function obtenerCaracteristicasAleatorias() {
    const paisesAleatorios = datos.sort(() => 0.5 - Math.random()).slice(0, 4);
    const caracteristicas = paisesAleatorios.flatMap(pais => 
        pais.words_related.map(word => ({
            word,
            country_id: pais.country_id
        }))
    );
    return caracteristicas.sort(() => 0.5 - Math.random()).slice(0, 16);
}

function verificarSeleccion(seleccion) {
    const primerPaisId = seleccion[0].country_id;
    return seleccion.every(item => item.country_id === primerPaisId);
}

startServer(3000);
console.log(`Servidor Geographle Connections iniciado en el puerto 3000`);
