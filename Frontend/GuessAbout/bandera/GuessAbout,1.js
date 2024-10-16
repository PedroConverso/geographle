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

    const selectButton = document.querySelector('.boton');
    const paisSelect = document.getElementById('paisSelect');

    if (selectButton && paisSelect) {
        selectButton.addEventListener('click', () => {
            const respuestaUsuario = paisSelect.value;
            if (respuestaUsuario) {
                fetchData("verificarRespuestaFlag", { respuesta: respuestaUsuario }, (resultado) => {
                    if (resultado.esCorrecta) {
                        console.log("¡Correcto! La respuesta es acertada.");
                    } else {
                        console.log("Incorrecto. La respuesta no es acertada.");
                    }
                    console.log(`Vidas restantes: ${resultado.vidas}`);
                    if (resultado.gameOver) {
                        console.log(resultado.mensaje);
                    }
                });
            } else {
                console.log("Por favor, selecciona un país antes de verificar.");
            }
        });
    } else {
        console.error("No se encontró el botón de selección o el select de país");
    }
});


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
