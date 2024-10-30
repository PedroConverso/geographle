import readline from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../data/Top_10.json');
let top10Data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

export function consignaAleatoria() {
  const randomTopicIndex = Math.floor(Math.random() * top10Data.top10.length);
  const selectedTopic = top10Data.top10[randomTopicIndex].topic; // Solo seleccionar el tema
  return selectedTopic;
}

export function obtenerPaisesPorTema(tema) {
    // Buscar el tema en el array de top10
    const topicData = top10Data.top10.find(t => t.topic === tema);
    
    if (!topicData) {
        throw new Error('Tema no encontrado');
    }

    // Extraer solo los países con su información relevante
    return topicData.items.map(item => ({
        rank: item.rank,
        country_id: item.country_id,
        name: item.name,
        value: item[Object.keys(item).find(key => !['rank', 'country_id', 'name'].includes(key))] // Obtiene el valor específico (islands, gold, etc.)
    }));
}

// Ejemplo de uso combinado con tu función existente:
export function obtenerRondaAleatoria() {
    const tema = consignaAleatoria(); // Usa tu función existente
    const paises = obtenerPaisesPorTema(tema);
    return {
        tema: tema,
        paises: paises
    };
}

console.log(obtenerRondaAleatoria());


// Función para limpiar el texto de entrada
export function limpiarTexto(texto) {
  return texto
      .trim()                         // Elimina espacios al inicio y final
      .toLowerCase()                  // Convierte a minúsculas
      .normalize('NFD')               // Normaliza caracteres especiales
      .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos
      .replace(/[^a-z0-9\s]/g, '')    // Solo permite letras, números y espacios
      .replace(/\s+/g, ' ');          // Reduce múltiples espacios a uno solo
}

// Función para validar la respuesta del usuario
export function validarRespuesta(respuestaUsuario, paisesRonda) {
  const respuestaLimpia = limpiarTexto(respuestaUsuario);
  
  // Buscar coincidencia en la lista de países
  const paisEncontrado = paisesRonda.find(pais => 
      limpiarTexto(pais.name) === respuestaLimpia
  );

  if (paisEncontrado) {
      return {
          esValida: true,
          pais: paisEncontrado,
          respuestaLimpia: respuestaLimpia
      };
  }

  return {
      esValida: false,
      respuestaLimpia: respuestaLimpia
  };
}

// Ejemplo de uso combinado con las funciones anteriores:
export async function procesarRespuestaUsuario(respuesta, rondaActual) {
  try {
      const resultado = validarRespuesta(respuesta, rondaActual.paises);
      
      if (resultado.esValida) {
          return {
              exito: true,
              mensaje: `¡Correcto! ${resultado.pais.name} está en la posición ${resultado.pais.rank}`,
              paisAdivinado: resultado.pais
          };
      } else {
          return {
              exito: false,
              mensaje: "País no encontrado en la lista",
              respuestaLimpia: resultado.respuestaLimpia
          };
      }
  } catch (error) {
      return {
          exito: false,
          mensaje: "Error al procesar la respuesta",
          error: error.message
      };
  }
}

