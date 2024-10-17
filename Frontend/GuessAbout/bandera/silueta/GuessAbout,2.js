function mostrarImagenes() {
    fetchData("obtenerOpcionesForma", function(respuesta) {
        console.log(respuesta); // Add this for debugging
        
        // Ensure the response is an object with an array
        if (!respuesta || !Array.isArray(respuesta.shape_options)) {
            console.error("La respuesta no es un array:", respuesta);
            return;
        }

        // Assuming respuesta.shape_options is an array of URLs
        const imagenes = respuesta.shape_options;

        // Shuffle images randomly
        const imagenesAleatorias = imagenes.sort(() => Math.random() - 0.5);

        // Get the divs where the images will be displayed
        const divsCual = document.querySelectorAll('.cual');

        // Check that there are enough images
        divsCual.forEach((div, index) => {
            if (index < imagenesAleatorias.length) {
                const img = document.createElement('img');
                img.src = imagenesAleatorias[index];
                img.style.width = '100%'; // Occupies 100% of the space
                img.style.height = '100%'; // Occupies 100% of the space
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