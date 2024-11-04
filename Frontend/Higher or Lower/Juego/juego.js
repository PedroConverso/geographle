function openmenudropdown() {
    let menu = document.getElementById("menudropdown")
    if (menu.classList.contains("open")) {
        menu.classList.remove("open")
    } else {
        menu.classList.add("open")
    }
}

function openestadown() {
    let menu = document.getElementById("estadown")
    if (menu.classList.contains("edOpen")) {
        menu.classList.remove("edOpen")
    } else {
        menu.classList.add("edOpen")
    }
}

function optisdown() {
    let menu = document.getElementById("optidown")
    if (menu.classList.contains("edSet")) {
        menu.classList.remove("edSet")
    } else {
        menu.classList.add("edSet")
    }
}

function thememode() {
    let menu = document.getElementById("themeMode-check-container")
    if (menu.classList.contains("themeMode-check-container-on")) {
        menu.classList.remove("themeMode-check-container-on")
    } else {
        menu.classList.add("themeMode-check-container-on")
    }
}

function thememode2() {
    let menu = document.getElementById("themeMode-check-container2")
    if (menu.classList.contains("themeMode-check-container-on2")) {
        menu.classList.remove("themeMode-check-container-on2")
    } else {
        menu.classList.add("themeMode-check-container-on2")
    }
}

// Variables globales
let score = 0;
let highScore = localStorage.getItem('highLowHighScore') || 0;
let currentCountry1 = null;
let currentCountry2 = null;
let currentConsigna = null;

// Elementos del DOM
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.hig');
const izqDiv = document.querySelector('.izq');
const derDiv = document.querySelector('.der');
const orDiv = document.querySelector('.or');

// Formatear números grandes
function formatNumber(num, consigna) {
    if (consigna === 'Territory_km2') {
        return num.toLocaleString() + ' km²';
    } else if (consigna === 'population_millions') {
        return (num).toLocaleString() + ' M';
    } else if (consigna === 'gdp_millions') {
        return '$' + (num).toLocaleString() + ' M';
    }
    return num.toLocaleString();
}

// Traducir consigna a texto legible
function getConsignaText(consigna) {
    const translations = {
        'gdp_millions': 'GDP',
        'population_millions': 'Population',
        'Territory_km2': 'Territory'
    };
    return translations[consigna] || consigna;
}

// Actualizar la visualización
function updateDisplay() {
    // Actualizar puntuaciones
    scoreElement.textContent = `Score: ${score}`;
    highScoreElement.textContent = `High Score: ${highScore}`;
    
    // Actualizar el tipo de comparación
    orDiv.textContent = `Compare ${getConsignaText(currentConsigna)}`;
    
    // Actualizar información del país izquierdo
    if (!izqDiv.querySelector('.country-info')) {
        izqDiv.insertAdjacentHTML('afterbegin', `
            <div class="country-info">
                <h2 class="country-name"></h2>
                <div class="country-value"></div>
            </div>
        `);
    }
    
    // Actualizar información del país derecho
    if (!derDiv.querySelector('.country-info')) {
        derDiv.insertAdjacentHTML('afterbegin', `
            <div class="country-info">
                <h2 class="country-name"></h2>
                <div class="country-value"></div>
            </div>
        `);
    }
    
    // Actualizar datos del país izquierdo
    izqDiv.querySelector('.country-name').textContent = currentCountry1.country;
    izqDiv.querySelector('.country-value').textContent = 
        formatNumber(currentCountry1[currentConsigna], currentConsigna);
    
    // Actualizar datos del país derecho
    derDiv.querySelector('.country-name').textContent = currentCountry2.country;
    // Solo mostrar el valor después de que el usuario haga su elección
    derDiv.querySelector('.country-value').textContent = '???';
}

// Manejar la respuesta del usuario
function handleGuess(guess) {
    // Mostrar el valor del país derecho inmediatamente después de la elección
    derDiv.querySelector('.country-value').textContent = 
        formatNumber(currentCountry2[currentConsigna], currentConsigna);
    
    postData("validarRespuesta", {
        country1: currentCountry1,
        country2: currentCountry2,
        consigna: currentConsigna,
        userGuess: guess
    }, (response) => {
        setTimeout(() => {
            if (response) {
                // Respuesta correcta
                score++;
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem('highLowHighScore', highScore);
                }
                
                // Continuar el juego
                postData("continuarJuego", {
                    countryActual: currentCountry2,
                    consigna: currentConsigna
                }, (data) => {
                    currentCountry1 = currentCountry2;
                    currentCountry2 = data.nuevoPais;
                    currentConsigna = data.consigna;
                    updateDisplay();
                });
            } else {
                // Respuesta incorrecta
                score = 0;
                // Reiniciar juego
                initGame();
            }
        }, 1500); // Esperar 1.5 segundos para mostrar el resultado
    });
}

// Inicializar el juego
function initGame() {
    fetchData("iniciarRonda", (data) => {
        currentCountry1 = data.country1;
        currentCountry2 = data.country2;
        currentConsigna = data.consigna;
        updateDisplay();
    });
}

// Event listeners para los botones
document.querySelectorAll('.high').forEach(button => {
    button.addEventListener('click', () => handleGuess('higher'));
});

document.querySelectorAll('.low').forEach(button => {
    button.addEventListener('click', () => handleGuess('lower'));
});

// Iniciar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', initGame);