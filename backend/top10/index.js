import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let top10Data = null;
let currentTopic = null;

async function loadData() {
    if (!top10Data) {
        const dataPath = join(__dirname, '../data/Top_10.json');
        const rawData = await fs.readFile(dataPath, 'utf-8');
        top10Data = JSON.parse(rawData);
    }
    return top10Data;
}

export async function consignaAleatoriaTop10() {
    const data = await loadData();
    const randomTopicIndex = Math.floor(Math.random() * data.top10.length);
    currentTopic = data.top10[randomTopicIndex].topic;
    return currentTopic;
}

export async function verifyAnswerTop10(userAnswer) {
    if (!currentTopic) {
        throw new Error('No topic selected. Call consignaAleatoriaTop10 first.');
    }

    const data = await loadData();
    const topicData = data.top10.find(item => item.topic === currentTopic);

    if (!topicData) {
        return false;
    }

    const normalizedUserAnswer = userAnswer.toLowerCase().trim();
    return topicData.items.some(
        item => item.name.toLowerCase() === normalizedUserAnswer
    );
}

export async function guardarEstadisticasTop10(estadisticas) {
    console.log("Estadísticas recibidas:", estadisticas);
    try {
        const dataPath = join(__dirname, '../data/estadisticasTop10.json');
        const data = await fs.readFile(dataPath, 'utf-8');
        const stats = JSON.parse(data);
        stats.push(estadisticas);
        await fs.writeFile(dataPath, JSON.stringify(stats, null, 2));
        return { success: true };
    } catch (error) {
        console.error("Error al guardar estadísticas:", error);
        return { success: false, error: error.message };
    }
}


export async function cargarEstadisticasTop10(user) {
    const dataPath = join(__dirname, '../data/estadisticasTop10.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    const stats = JSON.parse(data);
    
    let labels = [];
    let paisesAcertados = [];
    
    // Agregar etiquetas y datos para el gráfico
    for (const stat of stats) {
        if (stat.username === user) {
            labels.push(stat.juego); // Etiquetas para el gráfico (ejemplo: nombre del juego o fecha)
            paisesAcertados.push(stat.paisesAcertados); // Datos de aciertos
        }
    }

    console.log("Cargar estadísticas:", { labels, paisesAcertados });
    return { labels, paisesAcertados };
}


    