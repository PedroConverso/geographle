// Keep existing functions (openmenudropdown, openestadown, etc.)

function mostrarImagenes() {
    fetchData("obtenerOpcionesForma", function(respuesta) {
        console.log(respuesta);
        
        if (!respuesta || !Array.isArray(respuesta.shape_options)) {
            console.error("La respuesta no es un array:", respuesta);
            return;
        }

        const imagenes = respuesta.shape_options;
        const imagenesAleatorias = imagenes.sort(() => Math.random() - 0.5);
        const divsCual = document.querySelectorAll('.cual');

        divsCual.forEach((div, index) => {
            if (index < imagenesAleatorias.length) {
                const img = document.createElement('img');
                img.src = imagenesAleatorias[index];
                img.style.width = '100%';
                img.style.height = '100%';
                img.alt = 'Silueta de país';
                
                // Add click event handler
                img.addEventListener('click', function() {
                    handleShapeSelection(imagenesAleatorias[index]);
                });
                
                div.appendChild(img);
            }
        });
    });
}

function handleShapeSelection(selectedShape) {
    // Remove previous selection styling
    document.querySelectorAll('.cual img').forEach(img => {
        img.parentElement.classList.remove('selected');
    });
    
    // Add selection styling to clicked image
    const selectedImg = Array.from(document.querySelectorAll('.cual img'))
        .find(img => img.src === selectedShape);
    if (selectedImg) {
        selectedImg.parentElement.classList.add('selected');
    }

    // Verify the answer
    postData("verificarRespuestaForma", selectedShape, function(response) {
        console.log("Respuesta recibida:", response);
        
        // Update attempts counter
        const attemptDiv = document.querySelector('.atte');
        const currentAttempts = 2 - (response.vidas || 0);
        attemptDiv.textContent = `Attemps: ${currentAttempts}/2`;

        if (response.esCorrecta) {
            // Handle correct answer
            showResult(true);
            setTimeout(() => {
                window.location.href = '/Frontend/GuessAbout/bandera/silueta/lengua/';
            }, 1500);
        } else if (response.gameOver || currentAttempts >= 2) {
            // Handle game over
            showResult(false);
            setTimeout(() => {
                // Redirect to game over page or restart
                window.location.href = '/Frontend/Menu/';
            }, 1500);
        }
    });
}

function showResult(isCorrect) {
    // Create result overlay
    const overlay = document.createElement('div');
    overlay.className = 'result-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = isCorrect ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';

    const message = document.createElement('h2');
    message.textContent = isCorrect ? '¡Correcto!' : '¡Incorrecto!';
    message.style.color = 'white';
    message.style.fontSize = '2em';
    message.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';

    overlay.appendChild(message);
    document.body.appendChild(overlay);
}

// Call mostrarImagenes when the page loads
document.addEventListener('DOMContentLoaded', mostrarImagenes);

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