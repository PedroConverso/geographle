import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Cargar los datos del JSON
let countries;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadData() {
    const path = join(__dirname, '../data/higher_or_lower.json');
    let data = fs.readFileSync(path)
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
export function validarRespuesta(data) {

    // Comparamos los valores de la consigna en country1 y country2
    let valorCountry1 = data.country1[data.consigna];
    let valorCountry2 = data.country2[data.consigna];

    // Determinamos si la respuesta del usuario es correcta
    if (valorCountry1 < valorCountry2 && data.userGuess === "higher" || valorCountry1 > valorCountry2 && data.userGuess === "lower") {
        return true
    } else {
        return false
    }
}


// Continuar juego con un nuevo país
export function continuarJuego(countryActual) {
    let country2 = obtenerPaisAleatorio();
    let country1 = countryActual

    // Asegurarse de que el nuevo país sea diferente al actual
    while (country2 === country1) {
        country2 = obtenerPaisAleatorio();
    }

    console.log({ country1, country2 })
    // Enviar el nuevo país para la siguiente comparación
    return { country1, country2};
}

