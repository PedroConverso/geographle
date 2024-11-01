import {readFileSync, writeFileSync} from 'fs';
import { startServer, onEvent } from 'soquetic';

const paises = JSON.parse(readFileSync("../data/higher_or_lower.json"))

onEvent()



startServer()