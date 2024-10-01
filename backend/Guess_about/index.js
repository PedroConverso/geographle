import fs from 'fs';
import { onEvent, sendEvent, startServer } from "soquetic";

let datos = JSON.parse(fs.readFileSync('./data/Guess_about.json', 'utf8'));
let vidasBandera = 3; // Vidas para la ronda de la bandera
let vidasGenerales = 5; // Vidas totales para las otras rondas
let paisActual = null;

function obtenerPaisAleatorio() {
  return datos[Math.floor(Math.random() * datos.length)];
}

function generarOpciones(prop) {
  let opciones = new Set();
  for (let i = 0; i < datos.length; i++) {
    opciones.add(datos[i][prop]);
  }
  opciones = Array.from(opciones);
  if (!opciones.includes(paisActual[prop])) {
    opciones[Math.floor(Math.random() * opciones.length)] = paisActual[prop];
  }
  return opciones.sort(() => 0.5 - Math.random());
}

function verificarRespuesta(prop, respuesta) {
  return paisActual[prop].toLowerCase() === respuesta.toLowerCase();
}

// Función para obtener la bandera sin opciones de respuesta
function obtenerFlag() {
  paisActual = obtenerPaisAleatorio();
  return {
    flag: paisActual.flag
  };
}

function obtenerOpcionesIdioma() {
  return {
    language_options: generarOpciones('language')
  };
}

function obtenerOpcionesCapital() {
  return {
    capital_options: generarOpciones('capital')
  };
}

function obtenerOpcionesForma() {
  return {
    shape_options: generarOpciones('country_shape')
  };
}

// Verificación de respuestas
function verificarRespuestaFlag(respuesta) {
  return verificarRespuestaGeneral('name', respuesta, 'bandera'); // Ronda de bandera
}

function verificarRespuestaIdioma(respuesta) {
  return verificarRespuestaGeneral('language', respuesta, 'general'); // Rondas generales
}

function verificarRespuestaCapital(respuesta) {
  return verificarRespuestaGeneral('capital', respuesta, 'general'); // Rondas generales
}

function verificarRespuestaForma(respuesta) {
  return verificarRespuestaGeneral('country_shape', respuesta, 'general'); // Rondas generales
}

function verificarRespuestaGeneral(prop, respuesta, tipoRonda) {
  const esCorrecta = verificarRespuesta(prop, respuesta);

  if (!esCorrecta) {
    if (tipoRonda === 'bandera') {
      vidasBandera--; // Restar vida si la respuesta de la bandera es incorrecta
    } else {
      vidasGenerales--; // Restar vida si la respuesta de las rondas generales es incorrecta
    }
  }

  // Verificar vidas
  if (tipoRonda === 'bandera' && vidasBandera === 0) {
    return {
      esCorrecta,
      vidas: vidasBandera,
      gameOver: true,
      mensaje: "Te has quedado sin vidas en la ronda de la bandera."
    };
  } else if (tipoRonda === 'general' && vidasGenerales === 0) {
    return {
      esCorrecta,
      vidas: vidasGenerales,
      gameOver: true,
      mensaje: "Te has quedado sin vidas en las rondas generales."
    };
  }

  return {
    esCorrecta,
    vidas: tipoRonda === 'bandera' ? vidasBandera : vidasGenerales,
  };
}

// Eventos
onEvent("obtenerFlag", obtenerFlag);
onEvent("obtenerOpcionesIdioma", obtenerOpcionesIdioma);
onEvent("obtenerOpcionesCapital", obtenerOpcionesCapital);
onEvent("obtenerOpcionesForma", obtenerOpcionesForma);
onEvent("verificarRespuestaFlag", verificarRespuestaFlag);
onEvent("verificarRespuestaIdioma", verificarRespuestaIdioma);
onEvent("verificarRespuestaCapital", verificarRespuestaCapital);
onEvent("verificarRespuestaForma", verificarRespuestaForma);

// Iniciar servidor
startServer(3000);
