// Función para cambiar el tema oscuro/claro
function thememode() {
    let body = document.getElementById("body");
    let themeToggle = document.getElementById("themeMode-check-container");

    // Verificar si el checkbox está seleccionado
    if (document.getElementById("themeMode-check").checked) {
        // Cambiar a modo oscuro
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
        themeToggle.classList.add("themeMode-check-container-on");
    } else {
        // Cambiar a modo claro
        body.classList.add("light-mode");
        body.classList.remove("dark-mode");
        themeToggle.classList.remove("themeMode-check-container-on");
    }
}


