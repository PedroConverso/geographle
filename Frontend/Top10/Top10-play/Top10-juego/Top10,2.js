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

// Datos simulados para el ejemplo
const top10Data = {
    "topic": "Países más poblados",
    "items": [
      {"rank": 1, "name": "China"},
      {"rank": 2, "name": "India"},
      {"rank": 3, "name": "Estados Unidos"},
      {"rank": 4, "name": "Indonesia"},
      {"rank": 5, "name": "Pakistán"},
      {"rank": 6, "name": "Brasil"},
      {"rank": 7, "name": "Nigeria"},
      {"rank": 8, "name": "Bangladés"},
      {"rank": 9, "name": "Rusia"},
      {"rank": 10, "name": "México"}
    ]
  };
  
  // Función para manejar la validación y actualización de la UI
  function validarPais() {
    const input = document.getElementById("etbal").value.trim().toLowerCase();
    const selected = top10Data.items.find(item => item.name.toLowerCase() === input);
  
    if (selected) {
      // Actualizar la UI con el país correcto
      const index = selected.rank - 1;
      const boxes = document.getElementsByClassName("rectan");
      boxes[index].innerText = `${selected.rank}. ${selected.name}`;
      boxes[index].style.backgroundColor = '#D4EDDA'; // Cambia el color de fondo para indicar acierto
    } else {
      alert("País incorrecto, intenta de nuevo!");
    }
  }
  
  document.getElementById("sel").addEventListener("click", validarPais);
  