
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

export async function consignaAleatoria() {
    const data = await loadData();
    const randomTopicIndex = Math.floor(Math.random() * data.top10.length);
    currentTopic = data.top10[randomTopicIndex].topic;
    return currentTopic;
}

export async function verifyAnswerTop10(userAnswer) {
    if (!currentTopic) {
        throw new Error('No topic selected. Call consignaAleatoria first.');
    }

    const data = await loadData();
    const topicData = data.top10.find(item => item.topic === currentTopic);

    if (!topicData) {
        return false;
    }

    // Normalizar la respuesta del usuario y las respuestas correctas
    const normalizedUserAnswer = userAnswer.toLowerCase().trim();
    const isCorrect = topicData.items.some(
        item => item.name.toLowerCase() === normalizedUserAnswer
    );

    return isCorrect;
}
console.log(currentTopic);