function mostrarImagenes() {
    fetchData("obtenerOpcionesForma", function(respuesta) {
        console.log(respuesta); // Agrega esto para depurar
        
        // Asegúrate de que la respuesta es un array de URLs
        if (!Array.isArray(respuesta)) {
            console.error("La respuesta no es un array:", respuesta);
            return;
        }

        // Suponemos que respuesta es un array de URLs de imágenes
        const imagenes = respuesta;

        // Mezclar las imágenes aleatoriamente
        const imagenesAleatorias = imagenes.sort(() => Math.random() - 0.5);

        // Obtener los divs donde se mostrarán las imágenes
        const divsCual = document.querySelectorAll('.cual');

        // Verificar que haya suficientes imágenes
        divsCual.forEach((div, index) => {
            if (index < imagenesAleatorias.length) {
                const img = document.createElement('img');
                img.src = imagenesAleatorias[index];
                img.style.width = '100%'; // Ocupa el 100% del espacio
                img.style.height = '100%'; // Ocupa el 100% del espacio
                img.alt = 'Silueta de país';
                div.appendChild(img);
            }
        });
    });
}


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