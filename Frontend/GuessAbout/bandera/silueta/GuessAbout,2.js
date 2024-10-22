// Inicialización del juego
let currentCountry = null;

// Función para inicializar el juego y mostrar las imágenes
async function initializeGame() {
    try {
        // Primero obtenemos la bandera/país actual
        fetchData("obtenerFlag", function(flagResponse) {
            if (!flagResponse) {
                console.error("Error obteniendo el país inicial");
                return;
            }
            
            // Una vez que tenemos el país, obtenemos las opciones de forma
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
                        // Limpiar el div antes de agregar la nueva imagen
                        div.innerHTML = '';
                        
                        const img = document.createElement('img');
                        img.src = imagenes[index];
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.alt = 'Silueta de país';
                        
                        // Manejar errores de carga de imagen
                        img.onerror = function() {
                            console.error(`Error cargando imagen: ${img.src}`);
                            img.src = 'path/to/fallback/image.png'; // Imagen de respaldo
                        };
                        
                        // Agregar evento click para selección
                        div.addEventListener('click', function() {
                            handleShapeSelection(imagenes[index]);
                        });
                        
                        div.appendChild(img);
                    }
                });
            });
        });
    } catch (error) {
        console.error("Error inicializando el juego:", error);
    }
}

// Función para manejar la selección de una forma
function handleShapeSelection(selectedShape) {
    postData("verificarRespuestaForma", selectedShape, function(response) {
        if (response.esCorrecta) {
            // Manejar respuesta correcta
            showSuccessMessage();
            updateAttempts(response.vidas);
            if (response.gameOver) {
                handleGameOver(response.mensaje);
            }
        } else {
            // Manejar respuesta incorrecta
            showErrorMessage();
            updateAttempts(response.vidas);
            if (response.gameOver) {
                handleGameOver(response.mensaje);
            }
        }
    });
}

// Funciones de utilidad para la UI
function showSuccessMessage() {
    // Implementar lógica para mostrar mensaje de éxito
    console.log("¡Correcto!");
}

function showErrorMessage() {
    // Implementar lógica para mostrar mensaje de error
    console.log("Incorrecto. Intenta de nuevo.");
}

function updateAttempts(vidas) {
    const attempsElement = document.querySelector('.atte');
    if (attempsElement) {
        attempsElement.textContent = `Attemps: ${vidas}/2`;
    }
}

function handleGameOver(mensaje) {
    alert(mensaje);
    // Redirigir a la siguiente ronda o a la pantalla de fin de juego
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initializeGame);

// Mantener las funciones del menú existentes
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