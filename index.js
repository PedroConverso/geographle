 HEAD
import fs from 'fs'

const data = fs.readFileSync('data/Top_10.json', 'utf-8');
console.log(data);

import fs from 'fs';
import readline from 'readline';

// Lee el archivo JSON
const datos = JSON.parse(fs.readFileSync('data/Connections.json', 'utf8'));

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

    console.log("\nAgrupa las características en grupos de 4 países:");
    pedirAgrupacion(caracteristicas, [], vidasMaximas);
}

// Función para pedir al usuario que agrupe las características
function pedirAgrupacion(caracteristicas, agrupacion, vidasRestantes) {
    if (vidasRestantes <= 0) {
        console.log("¡Has perdido todas tus vidas!");
        console.log("Agrupación final:");
        agrupacion.forEach((grupo, index) => {
            console.log(`Grupo ${index + 1}: ${grupo.join(', ')}`);
        });
        rl.close();
        return;
    }

    if (agrupacion.length === 4) {
        console.log("\nAgrupación final:");
        agrupacion.forEach((grupo, index) => {
            console.log(`Grupo ${index + 1}: ${grupo.join(', ')}`);
        });
        rl.close();
        return;
    }

    rl.question(`\nIngresa el número de las 4 características para el grupo ${agrupacion.length + 1} (separadas por comas): `, (respuesta) => {
        const indices = respuesta.split(',').map(num => parseInt(num.trim(), 10) - 1);
        if (indices.length !== 4 || indices.some(index => isNaN(index) || index < 0 || index >= 16)) {
            console.log("Entrada inválida. Por favor, ingresa 4 números válidos.");
            console.log(`Te quedan ${vidasRestantes - 1} vidas.`);
            pedirAgrupacion(caracteristicas, agrupacion, vidasRestantes - 1);
        } else {
            const grupo = indices.map(index => caracteristicas[index]);
            agrupacion.push(grupo);
            pedirAgrupacion(caracteristicas, agrupacion, vidasRestantes);
        }
    });
}

// Ejecuta el juego
mostrarJuego();
f11df3173146a7bf620c5e5be670973f94366d71
