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

// Cargar la bandera cuando el documento esté listo
document.addEventListener("DOMContentLoaded", function() {
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
});