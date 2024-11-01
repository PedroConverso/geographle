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

function infodown() {
    let menu = document.getElementById("infodown")
    if (menu.classList.contains("edinf")) {
        menu.classList.remove("edinf")
    } else {
        menu.classList.add("edinf")
    }
}

let currentTopic = null;
let currentRankingData = null;

// Inicialización del juego
function initializeApp() {
    // Obtener tema aleatorio al iniciar
    fetchData('getRandomTopic', (topic) => {
        currentTopic = topic;
        updateTopicDisplay(topic);
        
        // Una vez que tenemos el tema, obtener los datos del ranking
        fetchData('getTopicData', (data) => {
            currentRankingData = data;
            initializeBoxes();
        });
    });

    // Configurar el botón de selección
    document.querySelector('.doss').addEventListener('click', () => {
        // Obtener nuevo tema aleatorio
        fetchData('getRandomTopic', (topic) => {
            currentTopic = topic;
            updateTopicDisplay(topic);
            
            fetchData('getTopicData', (data) => {
                currentRankingData = data;
                resetBoxes();
            });
        });
    });
}

// Actualizar el título del tema
function updateTopicDisplay(topic) {
    const titleElement = document.querySelector('.title');
    if (titleElement) {
        titleElement.textContent = topic;
    }
}

// Inicializar las cajas con los números
function initializeBoxes() {
    const boxes1 = document.querySelector('.boxes1');
    const boxes2 = document.querySelector('.boxes2');

    if (boxes1 && boxes2) {
        const rectangles = document.querySelectorAll('.rectan');
        rectangles.forEach((rect, index) => {
            rect.textContent = `${index + 1}. ${currentRankingData[index].name}`;
            
            // Añadir el valor específico según el tipo de dato
            const data = currentRankingData[index];
            let value = '';
            
            if (data.islands) {
                value = `${data.islands.toLocaleString()} islands`;
            } else if (data.gold) {
                value = `${data.gold} gold medals`;
            } else if (data.average_life_expectancy) {
                value = data.average_life_expectancy;
            } else if (data.gpi) {
                value = `${data.gpi} GPI`;
            } else if (data.tourists_in_millions) {
                value = `${data.tourists_in_millions}M tourists`;
            } else if (data.coastline) {
                value = `${data.coastline.toLocaleString()} km`;
            } else if (data.air_pollution) {
                value = `${data.air_pollution} µg/m³`;
            }
            
            rect.textContent = `${index + 1}. ${data.name} - ${value}`;
        });
    }
}

// Resetear las cajas para un nuevo juego
function resetBoxes() {
    const rectangles = document.querySelectorAll('.rectan');
    rectangles.forEach((rect, index) => {
        rect.textContent = `${index + 1}.`;
    });
    initializeBoxes();
}

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initializeApp);