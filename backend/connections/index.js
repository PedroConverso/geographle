import fs from 'fs';
import { onEvent, startServer } from "soquetic";

let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

// Manejador del evento "registroUsuario"
onEvent("registroUsuario", registrarUsuario);

function registrarUsuario(username, password) {
    // Verificar si el usuario ya existe
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return 'Error: Username already exists';
        }
    }

    // Agregar el nuevo usuario
    users.push({ username, password });

    // Guardar los datos en el archivo JSON
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));

    return 'User registered successfully';
}

startServer(3000);
console.log('Servidor iniciado en el puerto 3000');
