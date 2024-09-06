import fs from 'fs'

const data = fs.readFileSync('data/Top_10.json');
const { paises } = JSON.parse(data);

console.log(data);
