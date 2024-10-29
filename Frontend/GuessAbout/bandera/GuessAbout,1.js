

// Menu handling functions
function toggleMenuClass(elementId, className) {
    const menu = document.getElementById(elementId);
    if (menu) {
        menu.classList.toggle(className);
    }
}

function openmenudropdown() {
    toggleMenuClass("menudropdown", "open");
}

function openestadown() {
    toggleMenuClass("estadown", "edOpen");
}

function optisdown() {
    toggleMenuClass("optidown", "edSet");
}

function thememode() {
    toggleMenuClass("themeMode-check-container", "themeMode-check-container-on");
}

function thememode2() {
    toggleMenuClass("themeMode-check-container2", "themeMode-check-container-on2");
}

// Game result display function
function showResult(isCorrect) {
    const overlay = document.createElement('div');
    overlay.className = 'result-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';

    const message = document.createElement('h2');
    message.textContent = isCorrect ? '¡Correcto!' : '¡Incorrecto!';
    message.style.color = 'white';
    message.style.fontSize = '2em';
    message.style.fontFamily = "sans";
    message.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';

    overlay.appendChild(message);
    document.body.appendChild(overlay);
}

// Shape selection game functions
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

        if (response.esCorrecta) {
            showResult(true);
            setTimeout(() => {
                window.location.href = '/Frontend/GuessAbout/bandera/silueta/lengua/index.html';
            }, 1500);
        } else if (response.gameOver || currentAttempts >= 2) {
            showResult(false);
            setTimeout(() => {
                window.location.href = '/Frontend/Menu/';
            }, 1500);
        }
    });
}

// Country verification game functions
function verifySelection() {
    const selectedCountry = document.querySelector('select').value;

    postData("verificarPais", { selectedCountry: selectedCountry }, (response) => {
        let messageElement = document.getElementById('game-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.id = 'game-message';
            document.querySelector('section').appendChild(messageElement);
        }

        if (response.esCorrecta) {
            messageElement.textContent = "¡Correcto! Has acertado el país.";
            messageElement.style.color = 'green';
            // Redirect to the new page after a short delay
            setTimeout(() => {
                window.location.href = '/Frontend/GuessAbout/bandera/silueta/index.html';
            }, 1500); // Adjust the delay as needed
        } else {
            messageElement.textContent = `Incorrecto. Te quedan ${response.vidas} vidas.`;
            messageElement.style.color = 'red';
            
            if (response.gameOver) {
                messageElement.textContent = response.mensaje;
                document.getElementById('verify-button').disabled = true;
            }
        }
    });
}

// Flag loading function
function loadFlag() {
    fetchData("obtenerFlag", (data) => {
        if (data && data.flag) {
            const flagImg = document.createElement('img');
            flagImg.src = data.flag;
            flagImg.alt = "Bandera del país";
            flagImg.style.width = "99%";
            flagImg.style.height = "99%";
            flagImg.style.objectFit = "contain";

            const flagContainer = document.querySelector('.banderabd');
            if (flagContainer) {
                flagContainer.innerHTML = '';
                flagContainer.appendChild(flagImg);
                flagContainer.style.display = "flex";
                flagContainer.style.justifyContent = "center";
                flagContainer.style.alignItems = "center";
            } else {
                console.error("Elemento con clase 'banderabd' no encontrado en el HTML");
            }
        } else {
            console.error("No se recibió una URL de bandera válida del servidor");
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize shape selection game if elements exist
    if (document.querySelector('.cual')) {
        mostrarImagenes();
    }
    
    // Initialize flag loading if element exists
    if (document.querySelector('.banderabd')) {
        loadFlag();
    }
});
function mostrarOpcionesIdioma() {
    fetchData("obtenerOpcionesIdioma", function(respuesta) {
        console.log(respuesta);
        
        if (!respuesta || !Array.isArray(respuesta.language_options)) {
            console.error("La respuesta no es un array:", respuesta);
            return;
        }

        const opciones = respuesta.language_options;
        const opcionesAleatorias = opciones.sort(() => Math.random() - 0.5);
        const divsCual = document.querySelectorAll('#cualid'); 

        divsCual.forEach((div, index) => {
            if (index < opcionesAleatorias.length) {
                div.textContent = opcionesAleatorias[index]; // Mostrar el texto de la opción
                
                // Agregar un evento clic para manejar la selección
                div.addEventListener('click', function() {
                    handleLanguageSelection(opcionesAleatorias[index]);
                });
            } else {
                div.textContent = ''; // Limpiar el contenido si hay más divs que opciones
            }
        });
    });
}
function handleLanguageSelection(selectedLanguage) {
    // Remove previous selection styling
    document.querySelectorAll('#cualid').forEach(div => {
        div.classList.remove('selected');
    });

    // Add selection styling to clicked option
    const selectedDiv = Array.from(document.querySelectorAll('#cualid'))
        .find(div => div.textContent === selectedLanguage);
    if (selectedDiv) {
        selectedDiv.classList.add('selected');
    }

    // Send the selected language to the backend
    postData("verificarRespuestaIdioma", { selectedLanguage }, (response) => {
        let messageElement = document.getElementById('game-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.id = 'game-message';
            document.querySelector('section').appendChild(messageElement);
        }

        if (response.esCorrecta) {
            messageElement.textContent = "¡Correcto! Has acertado el idioma.";
            messageElement.style.color = 'green';
            // Redirect to the new page after a short delay
            setTimeout(() => {
                window.location.href = '/Frontend/GuessAbout/bandera/silueta/lengua/capital/index.html';
            }, 1500); // Adjust the delay as needed
        } else {
            messageElement.textContent = `Incorrecto. Te quedan ${response.vidas} vidas.`;
            messageElement.style.color = 'red';
            
            if (response.gameOver) {
                messageElement.textContent = response.mensaje;
                document.querySelectorAll('#cualid').forEach(div => {
                    div.disabled = true;
                });
            }
        }
    });
}
// Llamada a mostrarOpcionesIdioma() cuando se cargue el DOM
document.addEventListener('DOMContentLoaded', mostrarOpcionesIdioma);

function mostrarOpcionesCapital() {
    fetchData("obtenerOpcionesCapital", function(respuesta) {
        console.log(respuesta);
        
        if (!respuesta || !Array.isArray(respuesta.capital_options)) {
            console.error("La respuesta no es un array:", respuesta);
            return;
        }

        const opciones = respuesta.capital_options;
        const opcionesAleatorias = opciones.sort(() => Math.random() - 0.5);
        const divsOpcion = document.querySelectorAll('.opcion-capital'); 

        divsOpcion.forEach((div, index) => {
            if (index < opcionesAleatorias.length) {
                div.textContent = opcionesAleatorias[index]; // Mostrar el texto de la opción
                
                // Limpiar cualquier evento previo para evitar duplicaciones
                div.replaceWith(div.cloneNode(true));

                // Agregar un evento clic para manejar la selección
                div.addEventListener('click', function() {
                    handleCapitalSelection(opcionesAleatorias[index]);
                });
            } else {
                div.textContent = ''; // Limpiar el contenido si hay más divs que opciones
            }
        });
    });
}

function handleCapitalSelection(selectedCapital) {
    // Remove previous selection styling
    document.querySelectorAll('.opcion-capital').forEach(div => {
        div.classList.remove('selected');
    });

    // Add selection styling to clicked option
    const selectedDiv = Array.from(document.querySelectorAll('.opcion-capital'))
        .find(div => div.textContent === selectedCapital);
    if (selectedDiv) {
        selectedDiv.classList.add('selected');
    }

    // Verify the answer
    postData("verificarRespuestaCapital", selectedCapital, function(response) {
        console.log("Respuesta recibida:", response);

        if (response.esCorrecta) {
            showResult(true);
            setTimeout(() => {
                window.location.href = '/Frontend/GuessAbout/bandera/silueta/lengua/capital/index.html';
            }, 1500);
        } else if (response.gameOver) {
            showResult(false);
            setTimeout(() => {
                window.location.href = '/Frontend/Menu/';
            }, 1500);
        }
    });
}
