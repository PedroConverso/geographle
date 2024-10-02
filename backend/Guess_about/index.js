import fs from 'fs';
import path from 'path';

let datos = JSON.parse(fs.readFileSync(path.resolve('proyecto-3-geographle/backend/data/Guess_about.json'), 'utf8'));


let vidasBandera = 3; 
let vidasGenerales = 5;
let paisActual = null;

export function obtenerPaisAleatorio() {
  return datos[Math.floor(Math.random() * datos.length)];
}

export function generarOpciones(prop) {
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

export function verificarRespuesta(prop, respuesta) {
  return paisActual[prop].toLowerCase() === respuesta.toLowerCase();
}


export function obtenerFlag() {
  paisActual = obtenerPaisAleatorio();
  return {
    flag: paisActual.flag
  };
}
export function obtenerOpcionesIdioma() {
  return {
    language_options: generarOpciones('language')
  };
}
console.log(generarOpciones);
export function obtenerOpcionesCapital() {
  return {
    capital_options: generarOpciones('capital')
  };
}

export function obtenerOpcionesForma() {
  return {
    shape_options: generarOpciones('country_shape')
  };
}

// Verificación de respuestas
export function verificarRespuestaFlag(respuesta) {
  return verificarRespuestaGeneral('name', respuesta, 'bandera');
}

export function verificarRespuestaIdioma(respuesta) {
  return verificarRespuestaGeneral('language', respuesta, 'general');
}

export function verificarRespuestaCapital(respuesta) {
  return verificarRespuestaGeneral('capital', respuesta, 'general');
}

export function verificarRespuestaForma(respuesta) {
  return verificarRespuestaGeneral('country_shape', respuesta, 'general'); 
}

export function verificarRespuestaGeneral(prop, respuesta, tipoRonda) {
  const esCorrecta = verificarRespuesta(prop, respuesta);

  if (!esCorrecta) {
    if (tipoRonda === 'bandera') {
      vidasBandera--; 
    } else {
      vidasGenerales--; 
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

