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

function infodown() {
    let menu = document.getElementById("infodown")
    if (menu.classList.contains("edinf")) {
        menu.classList.remove("edinf")
    } else {
        menu.classList.add("edinf")
    }
}

fetchData("caracteristicasAleatorias", callback => {
    let data = callback
    data.forEach((palabra, index) => {
        let box = document.getElementById("sixt_" + index)
        box.innerHTML = palabra.word
    });
})

let objeto4Palabras = []

let sixt = document.querySelectorAll(".sixt")
sixt.forEach(six => {
    six.addEventListener("click", function() {
        objeto4Palabras.push(six.innerHTML);
        console.log(objeto4Palabras);
        
        if (objeto4Palabras.length == 4) {
            postData("verificarSeleccion", objeto4Palabras, (res) => {
                console.log(res);
                if (res.esCorrecta === true) {
                    six.disabled = true
                } else {
                    updateVidas(res.vidas)
                }
            });
            objeto4Palabras = []
        }
    });
});

let vidas = 5

function updateVidas(vidasCounter) {
    let redondos = document.querySelectorAll('.puntitos .redondo');
    let vidas = vidasCounter
    let counter = Array.from(redondos).slice(0, vidasCounter);

    counter.forEach(div => {
        div.style.backgroundColor = 'red';
      });

    redondos.forEach(div => {
        if (!counter.includes(div)) {
            div.style.backgroundColor = '#fff';
        }
    });
}

document.addEventListener("DOMContentLoaded", updateVidas())