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