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


