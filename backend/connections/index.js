import fs from 'fs';
import readline from 'readline';

const datos = JSON.parse(fs.readFileSync('C:/GitHub/proyecto-3-geographle/data/Connections.json', 'utf8'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const vidasMaximas = 5;

function obtenerCaracteristicasAleatorias() {
    const paisesAleatorios = datos.sort(() => 0.5 - Math.random()).slice(0, 4);
    const caracteristicas = paisesAleatorios.flatMap(pais => pais.words_related);
    return caracteristicas.sort(() => 0.5 - Math.random()).slice(0, 16);
}

function mostrarJuego() {
    const caracteristicas = obtenerCaracteristicasAleatorias();
    console.log("Características a agrupar:");
    caracteristicas.forEach((caracteristica, index) => {
        console.log(`${index + 1}. ${caracteristica}`);
    });

    console.log("\nAgrupa las características en grupos de 4 características pertenecientes al mismo país:");
    pedirAgrupacion(caracteristicas, [], vidasMaximas);
}

function pedirAgrupacion(caracteristicas, agrupacion, vidasRestantes) {
    if (vidasRestantes <= 0 || agrupacion.length === 4) {
        console.log("¡Has terminado el juego!");
        mostrarAgrupacionFinal(agrupacion, caracteristicas);
        rl.close();
        return;
    }

    rl.question(`\nIngresa el número de las 4 características para el grupo ${agrupacion.length + 1} (separadas por comas): `, (respuesta) => {
        const indices = respuesta.split(',').map(num => parseInt(num.trim(), 10) - 1);

        const uniqueIndices = [...new Set(indices)];
        if (indices.length !== 4 || uniqueIndices.length !== 4 || indices.some(index => isNaN(index) || index < 0 || index >= 16)) {
            console.log("Entrada inválida. Por favor, ingresa 4 números válidos y diferentes.");
            console.log(`Te quedan ${vidasRestantes - 1} vidas.`);
            pedirAgrupacion(caracteristicas, agrupacion, vidasRestantes - 1);
            return;
        }

        const paisesSeleccionados = indices.map(index => {
            return datos.find(pais => pais.words_related.includes(caracteristicas[index]));
        });

        const todosDelMismoPais = paisesSeleccionados.every((pais, _, arr) => pais === arr[0]);

        if (!todosDelMismoPais) {
            console.log("¡Error! Las características no pertenecen al mismo país.");
            console.log(`Te quedan ${vidasRestantes - 1} vidas.`);
            pedirAgrupacion(caracteristicas, agrupacion, vidasRestantes - 1);
        } else {
            const grupo = indices.map(index => caracteristicas[index]);
            agrupacion.push(grupo);
            console.log(`Grupo agregado: ${grupo.join(', ')}`);
            pedirAgrupacion(caracteristicas, agrupacion, vidasRestantes);
        }
    });
}

function mostrarAgrupacionFinal(agrupacion, caracteristicas) {
    console.log("Agrupación final:");

    const paisesEsperados = datos.sort(() => 0.5 - Math.random()).slice(0, 4);
    const gruposEsperados = paisesEsperados.map(pais => pais.words_related);

    const caracteristicasPorPais = {};
    datos.forEach(pais => {
        pais.words_related.forEach(caracteristica => {
            caracteristicasPorPais[caracteristica] = pais;
        });
    });

    const gruposCorrectos = [];
    for (let i = 0; i < 4; i++) {
        const grupo = [];
        const paisActual = paisesEsperados[i];
        const caracteristicasDelPais = paisActual.words_related;

        caracteristicasDelPais.forEach(caracteristica => {
            if (grupo.length < 4) {
                grupo.push(caracteristica);
            }
        });

        gruposCorrectos.push(grupo);
    }

    while (agrupacion.length < 4) {
        agrupacion.push([]);
    }

    agrupacion.forEach((grupo, index) => {
        console.log(`Grupo ${index + 1}: ${grupo.join(', ')}`);
    });

    console.log("\nGrupos correctos:");
    gruposCorrectos.forEach((grupo, index) => {
        console.log(`Grupo ${index + 1}: ${grupo.join(', ')}`);
    });
}

mostrarJuego();
