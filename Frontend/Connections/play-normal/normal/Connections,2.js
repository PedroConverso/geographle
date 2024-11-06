// Variables globales
let objeto4Palabras = [];
let postDataVerificarData = [];
let vidas = 5;
let responseReceived = false; // Estado para controlar la respuesta

// Array para almacenar las palabras correctas
let palabrasCorrectas = [];

// Función para mezclar un array de forma aleatoria
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio
        [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
    return array;
}

// Esperar a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", function() {
    // Obtener las palabras aleatorias y mostrarlas en el DOM
    fetchData("caracteristicasAleatorias", callback => {
        let data = callback;

        // Mezclar las palabras aleatorias
        data = mezclarArray(data);

        // Asignar palabras a los elementos con ID 'sixt_0', 'sixt_1', etc.
        data.forEach((palabra, index) => {
            let box = document.getElementById("sixt_" + index);
            box.innerHTML = palabra.word; // Asegúrate que 'word' es la propiedad correcta
            palabrasCorrectas.push(palabra.word); // Agregar palabra a la lista de palabras correctas

            // Añadir evento de clic a cada caja de palabras
            box.addEventListener("click", function() {
                if (objeto4Palabras.length < 4) {
                    // Cambiar color y deshabilitar antes de enviar
                    box.style.backgroundColor = 'darkgray'; // Cambiar a gris oscuro
                    box.style.pointerEvents = 'none'; // Deshabilitar el clic
                    objeto4Palabras.push(box.innerHTML); // Añadir palabra seleccionada

                    // Si se seleccionaron 4 palabras, enviar al backend
                    if (objeto4Palabras.length === 4 && !responseReceived) { // Verificar que no haya respuesta
                        postDataVerificarData = [objeto4Palabras, vidas]; // Agrupar en un array

                        // Verificar si las palabras seleccionadas son correctas
                        postData("verificarSeleccion", postDataVerificarData, (res) => {
                            responseReceived = true; // Cambiar el estado a respuesta recibida

                            if (res.esCorrecta) {
                                // Deshabilitar y cambiar a verde las palabras correctas
                                objeto4Palabras.forEach(palabra => {
                                    let box = Array.from(document.querySelectorAll(".sixt")).find(el => el.innerHTML === palabra);
                                    if (box) {
                                        box.style.backgroundColor = 'green'; // Cambiar el color a verde
                                        box.style.pointerEvents = 'none'; // Mantener deshabilitado
                                        box.style.opacity = '0.5'; // Cambiar la apariencia visual
                                    }
                                });

                                // Comprobar si todas las palabras han sido deshabilitadas
                                if (todasLasPalabrasDeshabilitadas(document.querySelectorAll(".sixt"))) {
                                    alert("¡Ganaste! Has seleccionado todas las palabras correctamente.");
                                    // Enviar estadísticas de victoria
                                    enviarEstadisticas(true); // Enviar que ganó
                                }
                            } else {
                                // Si la respuesta es incorrecta, volver a habilitar las palabras
                                objeto4Palabras.forEach(palabra => {
                                    let box = Array.from(document.querySelectorAll(".sixt")).find(el => el.innerHTML === palabra);
                                    if (box) {
                                        box.style.backgroundColor = ''; // Volver al color predeterminado
                                        box.style.pointerEvents = 'auto'; // Habilitar el clic
                                    }
                                });
                                updateVidas(res.vidas); // Actualizar vidas si es incorrecta
                            }

                            // Reiniciar objeto4Palabras independientemente de si la respuesta fue correcta o incorrecta
                            objeto4Palabras = []; // Reiniciar el array para la próxima ronda
                            responseReceived = false; // Resetear el estado para la siguiente ronda
                        });
                    }
                } else {
                    alert("Ya se han seleccionado 4 palabras.");
                }
            });
        });

        // Actualizar el número de vidas inicialmente
        updateVidas();
    });
});

// Función para enviar estadísticas al backend
function enviarEstadisticas(gano) {
    const user = localStorage.getItem("username")
    if(user != undefined){
        const estadisticas = {
            username: user,
            juego: "Connections", 
            gano: gano,
            vidasRestantes: vidas
        };
    
        postData("guardarEstadisticas", estadisticas, (response) => {
            console.log("Estadísticas enviadas:", response);
        });
    }
    
}

// Función para comprobar si todas las palabras están deshabilitadas
function todasLasPalabrasDeshabilitadas(sixt) {
    return Array.from(sixt).every(six => {
        return six.style.pointerEvents === 'none'; // Verificar si el clic está deshabilitado
    });
}

// Función para actualizar la visualización de las vidas
function updateVidas(vidasCounter = vidas) {
    let redondos = document.querySelectorAll('.puntitos .redondo');

    if (vidasCounter !== null) {
        vidas = vidasCounter;
    }

    let counter = Array.from(redondos).slice(0, vidas);

    // Cambiar a rojo los puntos de vida restantes
    counter.forEach(div => {
        div.style.backgroundColor = 'red';
    });

    // Restaurar los puntos de vida que no se usan a blanco
    redondos.forEach(div => {
        if (!counter.includes(div)) {
            div.style.backgroundColor = '#fff';
        }
    });

    // Perder el juego cuando las vidas lleguen a 0
    if (vidas === 0) {
        enviarEstadisticas(false); // Enviar que perdió
        vidas = 5; // Reinicia vidas para el siguiente día
        updateVidas(vidas);
    }
}

// Función para simular el bloqueo del juego por 24 horas
function bloquearJuego() {
    let sixt = document.querySelectorAll(".sixt");
    sixt.forEach(six => {
        six.style.pointerEvents = 'none'; // Deshabilitar los clics
        six.style.opacity = '0.5'; // Cambiar la apariencia visual
    });
    alert("El juego está bloqueado por 24 horas.");
}