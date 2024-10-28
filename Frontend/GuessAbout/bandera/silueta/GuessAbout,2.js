// Variable global para almacenar el país actual
let currentGame = null;

// Función para inicializar la segunda ronda (siluetas)
async function initializeGame() {
    try {
        // Recuperar el juego actual del localStorage
        const savedGame = localStorage.getItem('currentGame');
        if (!savedGame) {
            console.error("No se encontró un juego en curso");
            return;
        }

        currentGame = JSON.parse(savedGame);
        
        // Obtener las opciones de forma para el país actual
        fetchData("obtenerOpcionesForma", function(shapeResponse) {
            if (!shapeResponse || !shapeResponse.shape_options) {
                console.error("Error: respuesta inválida", shapeResponse);
                return;
            }
            
            const imagenes = shapeResponse.shape_options;
            console.log("Imágenes a mostrar:", imagenes);
            
            // Mostrar las imágenes en los divs
            const divsCual = document.querySelectorAll('.cual');
            divsCual.forEach((div, index) => {
                if (index < imagenes.length) {
                    div.innerHTML = '';
                    
                    const img = document.createElement('img');
                    img.src = imagenes[index];
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.alt = 'Silueta de país';
                    
                    img.onerror = function() {
                        console.error(`Error cargando imagen: ${img.src}`);
                        img.src = 'path/to/fallback/image.png';
                    };
                    
                    div.addEventListener('click', function() {
                        handleShapeSelection(imagenes[index]);
                    });
                    
                    div.appendChild(img);
                }
            });
        });
    } catch (error) {
        console.error("Error inicializando el juego:", error);
    }
}

// Función para manejar la selección de forma
function handleShapeSelection(selectedShape) {
    postData("verificarRespuestaForma", selectedShape, function(response) {
        if (response.esCorrecta) {
            showSuccessMessage();
            updateAttempts(response.vidas);
            if (response.gameOver) {
                // Limpiar el juego actual al completar ambas rondas
                localStorage.removeItem('currentGame');
                handleGameOver(response.mensaje);
            }
        } else {
            showErrorMessage();
            updateAttempts(response.vidas);
            if (response.gameOver) {
                // Limpiar el juego actual si se acaban las vidas
                localStorage.removeItem('currentGame');
                handleGameOver(response.mensaje);
            }
        }
    });
}

// Funciones de utilidad para la UI
function showSuccessMessage() {
    console.log("¡Correcto!");
    // Implementa aquí la lógica para mostrar el mensaje de éxito en la UI
}

function showErrorMessage() {
    console.log("Incorrecto. Intenta de nuevo.");
    // Implementa aquí la lógica para mostrar el mensaje de error en la UI
}

function updateAttempts(vidas) {
    const attempsElement = document.querySelector('.atte');
    if (attempsElement) {
        attempsElement.textContent = `Attemps: ${vidas}/2`;
    }
}

function handleGameOver(mensaje) {
    alert(mensaje);
    // Implementa aquí la lógica para manejar el fin del juego
}

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', initializeGame);

// Funciones del menú
function openmenudropdown() {
    let menu = document.getElementById("menudropdown");
    menu.classList.toggle("open");
}

function openestadown() {
    let menu = document.getElementById("estadown");
    menu.classList.toggle("edOpen");
}

function optisdown() {
    let menu = document.getElementById("optidown");
    menu.classList.toggle("edSet");
}

function thememode() {
    let menu = document.getElementById("themeMode-check-container");
    menu.classList.toggle("themeMode-check-container-on");
}

function thememode2() {
    let menu = document.getElementById("themeMode-check-container2");
    menu.classList.toggle("themeMode-check-container-on2");
}