import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../data/connections.json');
let datos = JSON.parse(fs.readFileSync(filePath, 'utf8'));
let vidas;

export function obtenerCaracteristicasAleatorias() {
    const paisesAleatorios = datos.sort(() => 0.5 - Math.random()).slice(0, 4);
    const caracteristicas = paisesAleatorios.flatMap(pais => 
        pais.words_related
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .map(word => ({
                word,
                country_id: pais.country_id
            }))
    );
    return caracteristicas;
}

export function verificarSeleccion(seleccion) {
    vidas = seleccion[1];
    return datos.some(dato => 
        seleccion[0].every(palabra => dato.words_related.includes(palabra))
    );
}

export function guardarEstadisticas(estadisticas) {
    console.log("Estadísticas recibidas:", estadisticas);
    let data = fs.readFileSync('backend/data/estadisticasConnections.json', 'utf8');
    let stats = JSON.parse(data);
    stats.push(estadisticas)
    fs.writeFileSync('backend/data/estadisticasConnections.json', JSON.stringify(stats, null, 2));
    return { success: true };
}

export function handleVerificarSeleccion(data) {
    const esCorrecta = verificarSeleccion(data);
    if (!esCorrecta) vidas--;
    return { esCorrecta, vidas };
}

