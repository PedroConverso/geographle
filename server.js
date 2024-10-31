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

// Importaciones desde Top10/index.js
import { 
    verifyAnswerTop10,
    consignaAleatoria
} from './backend/top10/index.js'; 

// Eventos Top10
onEvent("consignaAleatoria", async () => {
    return await consignaAleatoria();
});

onEvent("verificarSeleccionTop10", async (userAnswer) => {
    return await verifyAnswerTop10(userAnswer);
});

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
    return verificarRespuestaFlag(data.selectedCountry); 
});
onEvent("verificarRespuestaIdioma", verificarRespuestaIdioma);
onEvent("verificarRespuestaCapital", verificarRespuestaCapital);
onEvent("verificarRespuestaForma", verificarRespuestaForma);

import { 
    registerUser,
    loginUser,
    checkUserSession
} from './backend/users/index.js'; 

onEvent("register", registerUser);
onEvent("login", loginUser);
onEvent("checkSession", checkUserSession);

startServer();
