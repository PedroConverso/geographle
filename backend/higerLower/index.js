import fs from 'fs';

// Cargar los datos del JSON
let countries;

function loadData() {
    const data = fs.readFileSync('../data/higher_or_lower.json');
    countries = JSON.parse(data).countries;
}

// Función para obtener una consigna aleatoria
function consignaAleatoria() {
    const consignas = ['gdp_millions', 'population_millions', 'Territory_km2'];
    const randomIndex = Math.floor(Math.random() * consignas.length);
    return consignas[randomIndex];
}

// Función para seleccionar dos países aleatorios
function obtenerPaisesAleatorios() {
    const country1 = countries[Math.floor(Math.random() * countries.length)];
    let country2 = countries[Math.floor(Math.random() * countries.length)];
    while (country2 === country1) {
        country2 = countries[Math.floor(Math.random() * countries.length)];
    }
    return { country1, country2 };
}

// Función para comparar dos países según la consigna
function compararPaises(country1, country2, consigna) {
    if (country1[consigna] > country2[consigna]) {
        return { ganador: country1, atributo: consigna };
    } else {
        return { ganador: country2, atributo: consigna };
    }
}

// Ejemplo de uso
function jugarRonda() {
    loadData(); // Cargar los datos una vez
    const consigna = consignaAleatoria();
    const { country1, country2 } = obtenerPaisesAleatorios();
    const resultado = compararPaises(country1, country2, consigna);
    
    console.log(`Comparando ${consigna}:`);
    console.log(`${country1.country}: ${country1[consigna]}`);
    console.log(`${country2.country}: ${country2[consigna]}`);
    console.log(`Ganador: ${resultado.ganador.country} con ${resultado.ganador[consigna]}`);
}

// Ejecutar una ronda de ejemplo
jugarRonda();
