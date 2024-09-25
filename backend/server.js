import fs from 'fs';
import { onEvent, startServer } from "soquetic";

onEvent("caracteristicasAleatorias", obtenerCaracteristicasAleatorias);


import  { obtenerCaracteristicasAleatorias, verificarSeleccion  } from "/connections/index.js  ";
startServer(3000);