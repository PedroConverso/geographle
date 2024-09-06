import fs from 'fs';
import readline from 'readline';

// Lee el archivo JSON
const datos = JSON.parse(fs.readFileSync('C:/Users/49123768/Documents/GitHub/proyecto-3-geographle/data/Connections.json', 'utf8'));

// Configura readline para entrada del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Número de vidas
const vidasMaximas = 5;

// Función para obtener características aleatorias de 4 países
function obtenerCaracteristicasAleatorias() {
    const paisesAleatorios = datos.sort(() => 0.5 - Math.random()).slice(0, 4);
    const caracteristicas = paisesAleatorios.flatMap(pais => pais.words_related);
    return caracteristicas.sort(() => 0.5 - Math.random()).slice(0, 16);
}

// Función para mostrar las características y pedir al usuario que agrupe
function mostrarJuego() {
    const caracteristicas = obtenerCaracteristicasAleatorias();
    console.log("Características a agrupar:");
    caracteristicas.forEach((caracteristica, index) => {
        console.log(`${index + 1}. ${caracteristica}`);
    });

    console.log("\nAgrupa las características en grupos de 4 características pertenecientes al mismo país:");
    pedirAgrupacion(caracteristicas, [], vidasMaximas);
}

// Función para pedir al usuario que agrupe las características
function pedirAgrupacion(caracteristicas, agrupacion, vidasRestantes) {
    if (vidasRestantes <= 0 || agrupacion.length === 4) {
        console.log("¡Has terminado el juego!");
        mostrarAgrupacionFinal(agrupacion, caracteristicas);
        rl.close();
        return;
    }

    rl.question(`\nIngresa el número de las 4 características para el grupo ${agrupacion.length + 1} (separadas por comas): `, (respuesta) => {
        const indices = respuesta.split(',').map(num => parseInt(num.trim(), 10) - 1);

        // Verificar que no haya características repetidas en el grupo
        const uniqueIndices = [...new Set(indices)];
        if (indices.length !== 4 || uniqueIndices.length !== 4 || indices.some(index => isNaN(index) || index < 0 || index >= 16)) {
            console.log("Entrada inválida. Por favor, ingresa 4 números válidos y diferentes.");
            console.log(`Te quedan ${vidasRestantes - 1} vidas.`);
            pedirAgrupacion(caracteristicas, agrupacion, vidasRestantes - 1);
            return;
        }

        // Obtener el país al que pertenece cada característica seleccionada
        const paisesSeleccionados = indices.map(index => {
            return datos.find(pais => pais.words_related.includes(caracteristicas[index]));
        });

        // Verificar si todas las características seleccionadas pertenecen al mismo país
        const todosDelMismoPais = paisesSeleccionados.every((pais, _, arr) => pais === arr[0]);

        if (!todosDelMismoPais) {
            console.log("¡Error! Las características no pertenecen al mismo país.");
            console.log(`Te quedan ${vidasRestantes - 1} vidas.`);
            pedirAgrupacion(caracteristicas, agrupacion, vidasRestantes - 1);
        } else {
            const grupo = indices.map(index => caracteristicas[index]);
            agrupacion.push(grupo);
            console.log(`Grupo agregado: ${grupo.join(', ')}`); // Depuración
            pedirAgrupacion(caracteristicas, agrupacion, vidasRestantes);
        }
    });
}

// Función para mostrar la agrupación final
function mostrarAgrupacionFinal(agrupacion, caracteristicas) {
    console.log("Agrupación final:");

    // Inicializar grupos correctos
    const paisesEsperados = datos.sort(() => 0.5 - Math.random()).slice(0, 4);
    const gruposEsperados = paisesEsperados.map(pais => pais.words_related);

    // Crear una lista de características y asociarlas a países para verificar
    const caracteristicasPorPais = {};
    datos.forEach(pais => {
        pais.words_related.forEach(caracteristica => {
            caracteristicasPorPais[caracteristica] = pais;
        });
    });

    // Agrupar las características en grupos correctos
    const gruposCorrectos = [];
    for (let i = 0; i < 4; i++) {
        const grupo = [];
        const paisActual = paisesEsperados[i];
        const caracteristicasDelPais = paisActual.words_related;

        // Añadir características del país al grupo
        caracteristicasDelPais.forEach(caracteristica => {
            if (grupo.length < 4) {
                grupo.push(caracteristica);
            }
        });

        gruposCorrectos.push(grupo);
    }

    // Rellenar con grupos vacíos si es necesario
    while (agrupacion.length < 4) {
        agrupacion.push([]);
    }

    // Mostrar los grupos del usuario
    agrupacion.forEach((grupo, index) => {
        console.log(`Grupo ${index + 1}: ${grupo.join(', ')}`);
    });

    // Mostrar los grupos correctos
    console.log("\nGrupos correctos:");
    gruposCorrectos.forEach((grupo, index) => {
        console.log(`Grupo ${index + 1}: ${grupo.join(', ')}`);
    });
}

// Ejecuta el juego
mostrarJuego();

