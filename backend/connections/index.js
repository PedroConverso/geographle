import fs from 'fs';
import { onEvent, startServer } from "soquetic";

let datos = JSON.parse(fs.readFileSync('C:/Users/49004081/Documents/GitHub/proyecto-3-geographle/backend/connections', 'utf8'));
let vidas = 5;


onEvent("verificarSeleccion", (data) => {
    const esCorrecta = verificarSeleccion(data);
    if (!esCorrecta) vidas--;
    return { esCorrecta, vidas };
});

export function obtenerCaracteristicasAleatorias() {
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

export function verificarSeleccion(seleccion) {
    return datos.some(dato => 
        seleccion.every(palabra => dato.words_related.includes(palabra))
    );
}


startServer(3000);
console.log(`Servidor Geographle Connections iniciado en el puerto 3000`);
