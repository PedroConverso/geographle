import fs from 'fs';
import { onEvent, startServer } from "soquetic";

let users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

// Manejador del evento "registroUsuario"
onEvent("registroUsuario", registrarUsuario);

// Nuevo manejador del evento "inicioSesion"
onEvent("inicioSesion", iniciarSesion);

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
    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));

    return 'User registered successfully';
}

function iniciarSesion(username, password) {
    // Buscar el usuario y verificar la contraseña
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            return 'Login successful';
        }
    }
    return 'Error: Invalid username or password';
}