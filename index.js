import fs from 'fs'

const data = fs.readFileSync('data/Top_10.json', 'utf-8');
console.log(data);