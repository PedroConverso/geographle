import readlineSync from "readline-sync";
import fs, { writeFileSync } from "fs"; // Importar el módulo fs

let data = JSON.parse(fs.readFileSync("data/Connections.json", 'utf8'));
console.log(data);
JSON.stringify(fs.writeFileSync("data/Connections.json", 'utf8')) 