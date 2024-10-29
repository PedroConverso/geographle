import fs from 'fs';
import { onEvent, startServer } from "soquetic";
import path from 'path';
import { fileURLToPath } from 'url';



// Importaciones desde guess_about/index.js
import { 
    obtenerFlag,
    obtenerOpcionesIdioma,
    obtenerOpcionesCapital,
    obtenerOpcionesForma,
    verificarRespuestaFlag,
    verificarRespuestaIdioma,
    verificarRespuestaCapital,
    verificarRespuestaForma
} from './backend/Guess_about/index.js';  

// Importaciones desde connections/index.js
import { 
    obtenerCaracteristicasAleatorias, 
    verificarSeleccion, 
    guardarEstadisticas, 
    handleVerificarSeleccion 
} from './backend/connections/index.js'; 

// Eventos Connections
onEvent("caracteristicasAleatorias", obtenerCaracteristicasAleatorias);
onEvent("verificarSeleccion", handleVerificarSeleccion);
onEvent("guardarEstadisticas", guardarEstadisticas);

// Eventos Guess_about
onEvent("obtenerFlag", obtenerFlag);
onEvent("obtenerOpcionesIdioma", obtenerOpcionesIdioma);
onEvent("obtenerOpcionesCapital", obtenerOpcionesCapital);
onEvent("obtenerOpcionesForma", obtenerOpcionesForma);
onEvent("verificarPais", (data) => {
    return verificarRespuestaFlag(data.selectedCountry); // Asegúrate de que estás enviando solo el país seleccionado
});
onEvent("verificarRespuestaIdioma", verificarRespuestaIdioma);
onEvent("verificarRespuestaCapital", verificarRespuestaCapital);
onEvent("verificarRespuestaForma", verificarRespuestaForma);

startServer();
