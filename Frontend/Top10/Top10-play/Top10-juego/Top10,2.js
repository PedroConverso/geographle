// Funciones para fetchData y postData
function fetchData(type, callback) {
    fetch(`http://localhost:3000/${type}`)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error:', error));
}

function postData(type, data, callback) {
    fetch(`http://localhost:3000/${type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error:', error));
}

let top10Data; // Variable para almacenar el tópico seleccionado

// Función para obtener un tema aleatorio del servidor
function obtenerTemaAleatorio() {
    fetchData('tema-aleatorio', function(tema) {
        top10Data = tema;
        mostrarTopic();
    });
}

function mostrarTopic() {
    const titleElement = document.querySelector('.title');
    if (titleElement) {
        titleElement.innerText = top10Data.topic;
    } else {
        console.error("No se encontró un elemento con la clase 'title'.");
    }
}

// Función para manejar la validación y actualización de la UI
function validarPais() {
    const input = document.getElementById("etbal").value.trim().toLowerCase();
    
    postData('validar', { input, topic: top10Data.topic }, function(response) {
        if (response.isCorrect) {
            const correctAnswer = response.correctAnswer;
            const index = correctAnswer.rank - 1;
            const boxes = document.getElementsByClassName("rectan");

            if (!boxes[index].classList.contains('guessed')) {
                boxes[index].innerText = `${correctAnswer.rank}. ${correctAnswer.name}`;

                if (correctAnswer.hasOwnProperty('population')) {
                    boxes[index].innerText += ` (${correctAnswer.population} habitantes)`;
                } else if (correctAnswer.hasOwnProperty('coastline')) {
                    boxes[index].innerText += ` (${correctAnswer.coastline} km²)`;
                } else if (correctAnswer.hasOwnProperty('gold')) {
                    boxes[index].innerText += ` (${correctAnswer.gold} medallas de oro)`;
                } else if (correctAnswer.hasOwnProperty('islands')) {
                    boxes[index].innerText += ` (${correctAnswer.islands} islas)`;
                } else if (correctAnswer.hasOwnProperty('average_life_expectancy')) {
                    boxes[index].innerText += ` (${correctAnswer.average_life_expectancy})`;
                } else if (correctAnswer.hasOwnProperty('gpi')) {
                    boxes[index].innerText += ` (GPI: ${correctAnswer.gpi})`;
                } else if (correctAnswer.hasOwnProperty('tourists_in_millions')) {
                    boxes[index].innerText += ` (${correctAnswer.tourists_in_millions} millones de turistas)`;
                }

                boxes[index].style.backgroundColor = '#D4EDDA'; // Cambia el color de fondo para indicar acierto
                boxes[index].classList.add('guessed'); // Añadir clase para marcar que ya fue adivinado

                // Verificar si se han adivinado todos los países
                const allGuessed = Array.from(boxes).every(box => box.classList.contains('guessed'));
                if (allGuessed) {
                    alert("¡Felicidades! Has adivinado todos los países correctamente.");
                }
            }
        } else {
            alert("País incorrecto, intenta de nuevo!");
        }
    });
}

document.getElementById("sel").addEventListener("click", validarPais);

// Llama a obtenerTemaAleatorio al cargar la página
window.onload = obtenerTemaAleatorio;
