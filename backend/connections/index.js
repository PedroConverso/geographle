import fs from 'fs';
import readline from 'readline';
import { onEvent, startServer } from "soquetic"

// Lee el archivo JSON
const datos = JSON.parse(fs.readFileSync('C:/GitHub/proyecto-3-geographle/data/Connections.json', 'utf8'));

// Función para obtener características aleatorias de 4 países
function obtenerCaracteristicasAleatorias() {
    const paisesAleatorios = datos.sort(() => 0.5 - Math.random()).slice(0, 4);
    const caracteristicas = paisesAleatorios.flatMap(pais => pais.words_related);
    return caracteristicas.sort(() => 0.5 - Math.random()).slice(0, 16);
}
onEvent("caracteristicasAleatorias", obtenerCaracteristicasAleatorias)