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

// Probar la función
console.log(`Tema: ${consignaAleatoria()}`);
