// Para obtener características aleatorias
fetchData("caracteristicasAleatorias", (data) => {
    if (data.error) {
        console.error(data.error);
    } else {
        // Usa las características retornadas
        console.log(data);
    }
});

// Para verificar una selección
postData("verificarSeleccion", { seleccion: [/* array de 4 características */] }, (data) => {
    if (data.error) {
        console.error(data.error);
    } else {
        console.log(data.esCorrecta ? "¡Correcto!" : "Incorrecto, intenta de nuevo");
    }
});