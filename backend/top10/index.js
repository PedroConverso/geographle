import fs from 'fs'
import readline from 'node:readline'

const data = fs.readFileSync('C:/github/proyecto-3-geographle/data/Top_10.json' , 'utf-8');
const { paises } = JSON.parse(data);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let atempts = 0
let maxatemps = 10