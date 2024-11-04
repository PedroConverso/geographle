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

// Variables globales
let currentAnswers = new Set(); // Para rastrear las respuestas ya utilizadas

// Inicializar el juego
async function initializeGame() {
    const topicTitle = document.getElementById('topicTitle');
    // Obtener una consigna aleatoria del backend
    fetchData("consignaAleatoria", (topic) => {
        topicTitle.textContent = topic;
    });
}

// Manejar el envío de respuestas
function handleAnswer() {
    const input = document.getElementById('etbal');
    const answer = input.value.trim();
    
    if (!answer) return; // No procesar si está vacío
    
    if (currentAnswers.has(answer.toLowerCase())) {
        alert("Ya has usado esta respuesta!");
        input.value = '';
        return;
    }

    postData("verificarSeleccionTop10", answer, (result) => {
        if (result) {
            // Encontrar el primer div vacío
            const boxes = document.querySelectorAll('.rectan');
            for (let box of boxes) {
                const boxNumber = box.textContent.split('.')[0]; // Obtener solo el número inicial
                if (box.textContent === `${boxNumber}.`) { // Verificar si solo contiene el número y punto
                    box.textContent = `${boxNumber}. ${answer}`;
                    currentAnswers.add(answer.toLowerCase());
                    break;
                }
            }
            
            // Verificar si se completaron todas las respuestas
            if (currentAnswers.size === 10) {
                alert("¡Felicitaciones! ¡Has completado el Top 10!");
                // Aquí puedes agregar lógica adicional para el final del juego
            }
        } else {
            alert("Esa respuesta no es correcta. ¡Intenta otra vez!");
        }
        input.value = ''; // Limpiar el input después de cada intento
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    
    // Manejar el botón de selección
    const selectButton = document.getElementById('sel');
    selectButton.addEventListener('click', handleAnswer);
    
    // Manejar la tecla Enter en el input
    const input = document.getElementById('etbal');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAnswer();
        }
    });
});

// Función para reiniciar el juego
function resetGame() {
    currentAnswers.clear();
    const boxes = document.querySelectorAll('.rectan');
    boxes.forEach(box => {
        const number = box.textContent.split('.')[0];
        box.textContent = `${number}.`;
    });
    initializeGame();
}
