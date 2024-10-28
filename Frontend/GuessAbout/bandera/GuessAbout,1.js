// Variable global para almacenar el país actual
let currentGame = {
    country: null,
    flag: null
};

// Función para inicializar el juego - primera ronda (banderas)
document.addEventListener("DOMContentLoaded", function() {
    // Si no hay un juego en curso, obtener nuevo país
    if (!localStorage.getItem('currentGame')) {
        fetchData("obtenerFlag", (data) => {
            if (data && data.flag) {
                // Guardar los datos del juego
                currentGame.flag = data.flag;
                currentGame.country = data.country; // Asumiendo que el servidor también envía el país
                localStorage.setItem('currentGame', JSON.stringify(currentGame));
                
                // Mostrar la bandera
                displayFlag(data.flag);
            } else {
                console.error("No se recibió una URL de bandera válida del servidor");
            }
        });
    } else {
        // Recuperar juego existente
        currentGame = JSON.parse(localStorage.getItem('currentGame'));
        displayFlag(currentGame.flag);
    }
});

// Función para mostrar la bandera
function displayFlag(flagUrl) {
    const flagImg = document.createElement('img');
    flagImg.src = flagUrl;
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
    }
}

// Función para verificar la selección en la primera ronda
function verifySelection() {
    const selectedCountry = document.querySelector('select').value;
    
    postData("verificarPais", selectedCountry, (response) => {
        let messageElement = document.getElementById('game-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.id = 'game-message';
            document.querySelector('section').appendChild(messageElement);
        }

        if (response.esCorrecta) {
            messageElement.textContent = "¡Correcto! Has acertado el país.";
            messageElement.style.color = 'green';
            // Mantener el juego actual y pasar a la siguiente ronda
            window.location.href = "/Frontend/GuessAbout/bandera/silueta/index.html";
        } else {
            messageElement.textContent = `Incorrecto. Te quedan ${response.vidas} vidas.`;
            messageElement.style.color = 'red';
            
            if (response.gameOver) {
                messageElement.textContent = response.mensaje;
                document.getElementById('verify-button').disabled = true;
                // Limpiar el juego actual si se acaban las vidas
                localStorage.removeItem('currentGame');
            }
        }
    });
}

// Funciones del menú
function openmenudropdown() {
    let menu = document.getElementById("menudropdown");
    if (menu.classList.contains("open")) {
        menu.classList.remove("open");
    } else {
        menu.classList.add("open");
    }
}

function openestadown() {
    let menu = document.getElementById("estadown");
    if (menu.classList.contains("edOpen")) {
        menu.classList.remove("edOpen");
    } else {
        menu.classList.add("edOpen");
    }
}

function optisdown() {
    let menu = document.getElementById("optidown");
    if (menu.classList.contains("edSet")) {
        menu.classList.remove("edSet");
    } else {
        menu.classList.add("edSet");
    }
}

function thememode() {
    let menu = document.getElementById("themeMode-check-container");
    if (menu.classList.contains("themeMode-check-container-on")) {
        menu.classList.remove("themeMode-check-container-on");
    } else {
        menu.classList.add("themeMode-check-container-on");
    }
}

function thememode2() {
    let menu = document.getElementById("themeMode-check-container2");
    if (menu.classList.contains("themeMode-check-container-on2")) {
        menu.classList.remove("themeMode-check-container-on2");
    } else {
        menu.classList.add("themeMode-check-container-on2");
    }
}