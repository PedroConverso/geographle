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

document.getElementById("sel").addEventListener("click", function() {
    
})

const jsonData = {
  "top10": [
    {
      "topic": "Countries with the Most Islands",
      "items": [
        {
          "rank": 1,
          "country_id": "NOR",
          "name": "Norway",
          "islands": 239057
        },
        {
          "rank": 2,
          "country_id": "SWE",
          "name": "Sweden",
          "islands": 221831
        },
        {
          "rank": 3,
          "country_id": "CAN",
          "name": "Canada",
          "islands": 52455
        },
        {
          "rank": 4,
          "country_id": "FIN",
          "name": "Finland",
          "islands": 40000
        },
        {
          "rank": 5,
          "country_id": "USA",
          "name": "United States",
          "islands": 18617
        },
        {
          "rank": 6,
          "country_id": "IDN",
          "name": "Indonesia",
          "islands": 18307
        },
        {
          "rank": 7,
          "country_id": "JPN",
          "name": "Japan",
          "islands": 14125
        },
        {
          "rank": 8,
          "country_id": "AUS",
          "name": "Australia",
          "islands": 8222
        },
        {
          "rank": 9,
          "country_id": "PHL",
          "name": "Philippines",
          "islands": 7641
        },
        {
          "rank": 10,
          "country_id": "CHL",
          "name": "Chile",
          "islands": 5000
        }
      ]
    },
    {
      "topic": "Countries with the Most Olympic Gold Medals",
      "items": [
        {
          "rank": 1,
          "country_id": "USA",
          "name": "United States",
          "gold": 1022
        },
        {
          "rank": 2,
          "country_id": "GBR",
          "name": "United Kingdom",
          "gold": 263
        },
        {
          "rank": 3,
          "country_id": "CHN",
          "name": "China",
          "gold": 224
        },
        {
          "rank": 4,
          "country_id": "FRA",
          "name": "France",
          "gold": 212
        },
        {
          "rank": 5,
          "country_id": "ITA",
          "name": "Italy",
          "gold": 206
        },
        {
          "rank": 6,
          "country_id": "DEU",
          "name": "Germany",
          "gold": 191
        },
        {
          "rank": 7,
          "country_id": "HUN",
          "name": "Hungary",
          "gold": 175
        },
        {
          "rank": 8,
          "country_id": "RUS",
          "name": "Russia",
          "gold": 149
        },
        {
          "rank": 9,
          "country_id": "AUS",
          "name": "Australia",
          "gold": 147
        },
        {
          "rank": 10,
          "country_id": "SWE",
          "name": "Sweden",
          "gold": 145
        }
      ]
    },
    {
      "topic": "Countries with the Highest Average Life Expectancy",
      "items": [
        {
          "rank": 1,
          "country_id": "SMR",
          "name": "San Marino",
          "average_life_expectancy": "85.45 years"
        },
        {
          "rank": 2,
          "country_id": "MAC",
          "name": "Macao",
          "average_life_expectancy": "85.4 years"
        },
        {
          "rank": 3,
          "country_id": "CHE",
          "name": "Switzerland",
          "average_life_expectancy": "83.5 years"
        },
        {
          "rank": 4,
          "country_id": "SWE",
          "name": "Sweden",
          "average_life_expectancy": "83.15 years"
        },
        {
          "rank": 5,
          "country_id": "IRL",
          "name": "Ireland",
          "average_life_expectancy": "83.1 years"
        },
        {
          "rank": 6,
          "country_id": "AUS",
          "name": "Australia",
          "average_life_expectancy": "83.25 years"
        },
        {
          "rank": 7,
          "country_id": "NZL",
          "name": "New Zealand",
          "average_life_expectancy": "82.8 years"
        },
        {
          "rank": 8,
          "country_id": "JPN",
          "name": "Japan",
          "average_life_expectancy": "84.1 years"
        },
        {
          "rank": 9,
          "country_id": "ISL",
          "name": "Iceland",
          "average_life_expectancy": "82.2 years"
        },
        {
          "rank": 10,
          "country_id": "NOR",
          "name": "Norway",
          "average_life_expectancy": "82.6 years"
        }
      ]
    },
    {
      "topic": "Countries with the Lowest Global Peace Index (GPI)",
      "items": [
        {
          "rank": 1,
          "country_id": "AFG",
          "name": "Afghanistan",
          "gpi": 3.448
        },
        {
          "rank": 2,
          "country_id": "YEM",
          "name": "Yemen",
          "gpi": 3.350
        },
        {
          "rank": 3,
          "country_id": "SYR",
          "name": "Syria",
          "gpi": 3.294
        },
        {
          "rank": 4,
          "country_id": "SSD",
          "name": "South Sudan",
          "gpi": 3.221
        },
        {
          "rank": 5,
          "country_id": "COD",
          "name": "Congo (Democratic Republic)",
          "gpi": 3.214
        },
        {
          "rank": 6,
          "country_id": "RUS",
          "name": "Russia",
          "gpi": 3.142
        },
        {
          "rank": 7,
          "country_id": "UKR",
          "name": "Ukraine",
          "gpi": 3.043
        },
        {
          "rank": 8,
          "country_id": "SOM",
          "name": "Somalia",
          "gpi": 3.036
        },
        {
          "rank": 9,
          "country_id": "SDN",
          "name": "Sudan",
          "gpi": 3.023
        },
        {
          "rank": 10,
          "country_id": "IRQ",
          "name": "Iraq",
          "gpi": 3.006
        }
      ]
    },
    {
      "topic": "Countries with the Most Tourists (in millions)",
      "items": [
        {
          "rank": 1,
          "country_id": "FRA",
          "name": "France",
          "tourists_in_millions": 48.40
        },
        {
          "rank": 2,
          "country_id": "MEX",
          "name": "Mexico",
          "tourists_in_millions": 31.86
        },
        {
          "rank": 3,
          "country_id": "ESP",
          "name": "Spain",
          "tourists_in_millions": 31.18
        },
        {
          "rank": 4,
          "country_id": "TUR",
          "name": "Turkey",
          "tourists_in_millions": 29.93
        },
        {
          "rank": 5,
          "country_id": "ITA",
          "name": "Italy",
          "tourists_in_millions": 26.89
        },
        {
          "rank": 6,
          "country_id": "USA",
          "name": "United States",
          "tourists_in_millions": 22.10
        },
        {
          "rank": 7,
          "country_id": "GRC",
          "name": "Greece",
          "tourists_in_millions": 14.71
        },
        {
          "rank": 8,
          "country_id": "AUT",
          "name": "Austria",
          "tourists_in_millions": 12.73
        },
        {
          "rank": 9,
          "country_id": "DEU",
          "name": "Germany",
          "tourists_in_millions": 11.69
        },
        {
          "rank": 10,
          "country_id": "ARE",
          "name": "United Arab Emirates",
          "tourists_in_millions": 11.48
        }
      ]
    },
    {
      "topic": "Countries with the Longest Coastlines",
      "items": [
        {
          "rank": 1,
          "country_id": "CAN",
          "name": "Canada",
          "coastline": 202080.0
        },
        {
          "rank": 2,
          "country_id": "NOR",
          "name": "Norway",
          "coastline": 83281.0
        },
        {
          "rank": 3,
          "country_id": "IDN",
          "name": "Indonesia",
          "coastline": 54716.0
        },
        {
          "rank": 4,
          "country_id": "GRL",
          "name": "Greenland",
          "coastline": 44087.0
        },
        {
          "rank": 5,
          "country_id": "RUS",
          "name": "Russia",
          "coastline": 37653.0
        },
        {
          "rank": 6,
          "country_id": "PHL",
          "name": "Philippines",
          "coastline": 36289.0
        },
        {
          "rank": 7,
          "country_id": "JPN",
          "name": "Japan",
          "coastline": 29751.0
        },
        {
          "rank": 8,
          "country_id": "AUS",
          "name": "Australia",
          "coastline": 25957.0
        },
        {
          "rank": 9,
          "country_id": "USA",
          "name": "United States of America",
          "coastline": 19924.0
        },
        {
          "rank": 10,
          "country_id": "NZL",
          "name": "New Zealand",
          "coastline": 15134.0
        }
      ]
    },
    {
      "topic": "Countries with the Highest Levels of Air Pollution (2023)",
      "items": [
        {
          "rank": 1,
          "country_id": "BGD",
          "name": "Bangladesh",
          "air_pollution": 77.1
        },
        {
          "rank": 2,
          "country_id": "CHN",
          "name": "China",
          "air_pollution": 59.6
        },
        {
          "rank": 3,
          "country_id": "IND",
          "name": "India",
          "air_pollution": 51.9
        },
        {
          "rank": 4,
          "country_id": "PAK",
          "name": "Pakistan",
          "air_pollution": 48.2
        },
        {
          "rank": 5,
          "country_id": "NPL",
          "name": "Nepal",
          "air_pollution": 47.4
        },
        {
          "rank": 6,
          "country_id": "BHR",
          "name": "Bahrain",
          "air_pollution": 45.6
        },
        {
          "rank": 7,
          "country_id": "IDN",
          "name": "Indonesia",
          "air_pollution": 45.2
        },
        {
          "rank": 8,
          "country_id": "IRQ",
          "name": "Iraq",
          "air_pollution": 44.6
        },
        {
          "rank": 9,
          "country_id": "KWT",
          "name": "Kuwait",
          "air_pollution": 42.3
        },
        {
          "rank": 10,
          "country_id": "NGA",
          "name": "Nigeria",
          "air_pollution": 41.5
        }
      ]
    }
  ]
};

let top10Data; // Variable para almacenar el tópico seleccionado

// Función para seleccionar un tópico aleatoriamente
function seleccionarTopicoAleatorio() {
  const randomIndex = Math.floor(Math.random() * jsonData.top10.length);
  top10Data = jsonData.top10[randomIndex];
}

function mostrarTopic() {
  document.querySelector('.title').innerText = top10Data.topic;
}

// Función para manejar la validación y actualización de la UI
function validarPais() {
  const input = document.getElementById("etbal").value.trim().toLowerCase();
  const selected = top10Data.items.find(item => item.name.toLowerCase() === input);

  if (selected) {
    // Actualizar la UI con el país correcto
    const index = selected.rank - 1;
    const boxes = document.getElementsByClassName("rectan");

    if (!boxes[index].classList.contains('guessed')) {
      if (selected.hasOwnProperty('population')) {
        boxes[index].innerText = `${selected.rank}. ${selected.name} (${selected.population} habitantes)`;
      } else if (selected.hasOwnProperty('coastline')) {
        boxes[index].innerText = `${selected.rank}. ${selected.name} (${selected.coastline} km²)`;
      } else if (selected.hasOwnProperty('gold')) {
        boxes[index].innerText = `${selected.rank}. ${selected.name} (${selected.gold} medallas de oro)`;
      } else if (selected.hasOwnProperty('islands')) {
        boxes[index].innerText = `${selected.rank}. ${selected.name} (${selected.islands} islas)`;
      } else if (selected.hasOwnProperty('average_life_expectancy')) {
        boxes[index].innerText = `${selected.rank}. ${selected.name} (${selected.average_life_expectancy})`;
      } else if (selected.hasOwnProperty('gpi')) {
        boxes[index].innerText = `${selected.rank}. ${selected.name} (GPI: ${selected.gpi})`;
      } else if (selected.hasOwnProperty('tourists_in_millions')) {
        boxes[index].innerText = `${selected.rank}. ${selected.name} (${selected.tourists_in_millions} millones de turistas)`;
      } else {
        boxes[index].innerText = `${selected.rank}. ${selected.name}`;
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
}

document.getElementById("sel").addEventListener("click", validarPais);

// Llama a seleccionarTopicoAleatorio y mostrarTopic al cargar la página
window.onload = function() {
  seleccionarTopicoAleatorio();
  mostrarTopic();
};