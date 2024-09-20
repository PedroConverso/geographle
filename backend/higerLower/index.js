import fs from 'fs';
import readline from 'readline';
import { onEvent, startServer } from "soquetic"


const data = JSON.parse(fs.readFileSync('higher_or_lower.json', 'utf8'));
console.log(data);