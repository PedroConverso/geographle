import fs from 'fs';

// Cargar los datos del JSON
let countries;

function loadData() {
    const data = fs.readFileSync('../data/higher_or_lower.json');
    countries = JSON.parse(data).countries;
}

// Seleccionar una consigna aleatoria
function consignaAleatoria() {
    const consignas = ['gdp_millions', 'population_millions', 'Territory_km2'];
    return consignas[Math.floor(Math.random() * consignas.length)];
}

// Seleccionar un país aleatorio
function obtenerPaisAleatorio() {
    return countries[Math.floor(Math.random() * countries.length)];
}

// Enviar dos países al frontend para la primera ronda
export function iniciarRonda() {
    loadData(); // Cargar los datos
    const consigna = consignaAleatoria();
    const country1 = obtenerPaisAleatorio();
    let country2 = obtenerPaisAleatorio();
    
    // Asegurarse de que los países sean diferentes
    while (country2 === country1) {
        country2 = obtenerPaisAleatorio();
    }

    // Enviar datos iniciales al frontend
    return { country1, country2, consigna };
}

// Validar respuesta del usuario
export function validarRespuesta(country1, country2, consigna, userGuess) {
    const esCorrecto = (userGuess === 'higher' && country2[consigna] > country1[consigna]) || 
                       (userGuess === 'lower' && country2[consigna] < country1[consigna]);

    return esCorrecto;
}

// Continuar juego con un nuevo país
export function continuarJuego(countryActual, consigna) {
    let nuevoPais = obtenerPaisAleatorio();

    // Asegurarse de que el nuevo país sea diferente al actual
    while (nuevoPais === countryActual) {
        nuevoPais = obtenerPaisAleatorio();
    }

    // Enviar el nuevo país para la siguiente comparación
    return { nuevoPais, consigna };
}

console.log();