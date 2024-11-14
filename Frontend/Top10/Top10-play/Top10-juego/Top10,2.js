// Funciones de UI para los menús
function openmenudropdown() {
    const menu = document.getElementById("menudropdown");
    menu.classList.toggle("open");
}

function openestadown() {
    const menu = document.getElementById("estadown");
    menu.classList.toggle("edOpen");
}

function optisdown() {
    const menu = document.getElementById("optidown");
    menu.classList.toggle("edSet");
}

function thememode() {
    const menu = document.getElementById("themeMode-check-container");
    menu.classList.toggle("themeMode-check-container-on");
}

function thememode2() {
    const menu = document.getElementById("themeMode-check-container2");
    menu.classList.toggle("themeMode-check-container-on2");
}

function infodown() {
    const menu = document.getElementById("infodown");
    menu.classList.toggle("edinf");
}

// Variables globales para el juego
let currentAnswers = new Set(); // Para rastrear las respuestas ya utilizadas

// Función para enviar estadísticas al finalizar el juego o rendirse
function enviarEstadisticas(completado) {
    const user = localStorage.getItem("username");
    if (user) {
        const estadisticas = {
            username: user,
            juego: "Top10", 
            completado: completado,
            paisesAcertados: currentAnswers.size
        };
    
        postData("guardarEstadisticasTop10", estadisticas, (response) => {
            console.log("Estadísticas enviadas:", response);
        });
    }
}

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
    
    if (!answer) return;
    
    if (currentAnswers.has(answer.toLowerCase())) {
        alert("¡Ya has usado esta respuesta!");
        input.value = '';
        return;
    }

    postData("verificarSeleccionTop10", answer, (result) => {
        if (result) {
            const boxes = document.querySelectorAll('.rectan');
            for (let box of boxes) {
                const boxNumber = box.textContent.split('.')[0];
                if (box.textContent === `${boxNumber}.`) {
                    box.textContent = `${boxNumber}. ${answer}`;
                    currentAnswers.add(answer.toLowerCase());
                    break;
                }
            }
            
            // Cambia el fondo a verde claro si la respuesta es correcta
            input.style.backgroundColor = '#ccffcc';
            
            // Vuelve a su color original después de 1 segundo
            setTimeout(() => {
                input.style.backgroundColor = '';
            }, 1000);
            
            // Si completó los 10 países, enviar estadísticas de victoria
            if (currentAnswers.size === 10) {
                enviarEstadisticas(true);
                alert("¡Felicitaciones! ¡Has completado el Top 10!");
            }
        } else {
            alert("Esa respuesta no es correcta. ¡Intenta otra vez!");
        }
        input.value = '';
    });
}

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

// Función para rendirse
function surrender() {
    if (confirm("¿Estás seguro de que quieres rendirte?")) {
        enviarEstadisticas(false);
        resetGame();
        alert("Te has rendido. ¡Inténtalo de nuevo!");
    }
}

// Event Listeners cuando se carga la página
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
