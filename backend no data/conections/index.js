import fs from 'fs';

const rutaArchivo = 'data/Connections.json';

function obtenerPaisesYPalabrasAleatorias() {
    try {
        const datos = JSON.parse(fs.readFileSync(rutaArchivo, 'utf8'));

        if (datos.length === 0) {
            return 'No hay datos disponibles.';
        }

        const datosAleatorios = datos.sort(() => 0.5 - Math.random());

        const paisesSeleccionados = datosAleatorios.slice(0, 4);

        const resultado = paisesSeleccionados.map(function(paisDatos) {
            return {
                pais: paisDatos.nombre_pais,
                palabras: paisDatos.words_related.slice(0, 4)
            };
        });

        return resultado;
    } catch (error) {
        return `Error al leer o analizar el archivo: ${error.message}`;
    }
}

const paisesYPalabrasAleatorias = obtenerPaisesYPalabrasAleatorias();
console.log(paisesYPalabrasAleatorias);
