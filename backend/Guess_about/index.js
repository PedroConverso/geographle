import fs from 'fs';
import { onEvent, sendEvent, startServer } from "soquetic";

// Cargar datos del JSON
let datos = JSON.parse(fs.readFileSync('C:/Github/proyecto-3-geographle/data/countries.json', 'utf8'));

// Inicializar variable de vidas
let vidas = 5;

// Función para obtener un país aleatorio
function obtenerPaisAleatorio() {
  return datos[Math.floor(Math.random() * datos.length)];
}

// Función para generar las opciones de respuesta
function generarOpciones(prop, pais) {
  let opciones = [];
  
  switch (prop) {
    case 'language':
      opciones = datos.map(p => p.language).filter((l, i, self) => self.indexOf(l) === i);
      break;
    case 'capital':
      opciones = datos.map(p => p.capital);
      break;
    case 'country_shape':
      opciones = datos.map(p => p.country_shape);
      break;
  }
  
  // Asegurarse de que la respuesta correcta esté incluida
  if (!opciones.includes(pais[prop])) {
    opciones[Math.floor(Math.random() * opciones.length)] = pais[prop];
  }
  
  // Mezclar las opciones
  return opciones.sort(() => 0.5 - Math.random());
}

// Función para verificar la respuesta del usuario
function verificarRespuesta(pais, prop, respuesta) {
  return pais[prop] === respuesta;
}

// Manejar evento de solicitud de nuevo juego
onEvent("nuevojuego", () => {
  const paisAleatorio = obtenerPaisAleatorio();
  
  // Generar opciones
  const opcLanguage = generarOpciones('language', paisAleatorio);
  const opcCapital = generarOpciones('capital', paisAleatorio);
  const opcShape = generarOpciones('country_shape', paisAleatorio);
  
  // Enviar datos al frontend
  return {
    flag: paisAleatorio.flag,
    language_options: opcLanguage,
    capital_options: opcCapital,
    shape_options: opcShape
  };
});

// Manejar evento de verificación de respuesta
onEvent("verificarRespuesta", (data) => {
  const { prop, respuesta, pais } = data;
  const esCorrecta = verificarRespuesta(pais, prop, respuesta);
  
  if (!esCorrecta) {
    vidas--;
  }
  
  return {
    esCorrecta,
    vidas
  };
});

// Iniciar el servidor
startServer(3000);