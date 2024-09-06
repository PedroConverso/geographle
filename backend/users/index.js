import fs from 'fs/promises';
import readline from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

// Ruta al archivo JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'users.json');

// Función para leer usuarios
async function leerUsuarios() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // El archivo no existe, devuelve una lista vacía
            return [];
        }
        console.error('Error al leer el archivo de usuarios:', error);
        return [];
    }
}

// Función para guardar usuarios
async function guardarUsuarios(usuarios) {
    try {
        await fs.writeFile(filePath, JSON.stringify(usuarios, null, 2));
    } catch (error) {
        console.error('Error al guardar el archivo de usuarios:', error);
    }
}

// Generar un ID único simple
function generarUserId() {
    return Date.now().toString(); // Utiliza la marca de tiempo actual como ID
}

// Configurar readline para entrada del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Registro de usuario
async function registrarUsuario() {
    rl.question('Ingresa un nombre de usuario: ', (nombreUsuario) => {
        rl.question('Ingresa una contraseña: ', async (contrasena) => {
            const usuarios = await leerUsuarios();
            const nuevoUsuario = {
                user_id: generarUserId(),
                nombreUsuario,
                contrasena
            };
            usuarios.push(nuevoUsuario);
            await guardarUsuarios(usuarios);
            console.log('Usuario registrado exitosamente!');
            rl.close();
        });
    });
}

// Inicio de sesión
async function iniciarSesion() {
    rl.question('Ingresa tu nombre de usuario: ', (nombreUsuario) => {
        rl.question('Ingresa tu contraseña: ', async (contrasena) => {
            const usuarios = await leerUsuarios();
            const usuario = usuarios.find(user => user.nombreUsuario === nombreUsuario);

            if (usuario && usuario.contrasena === contrasena) {
                console.log('Inicio de sesión exitoso!');
            } else {
                console.log('Nombre de usuario o contraseña incorrectos.');
            }
            rl.close();
        });
    });
}

// Llama a la función deseada
function menu() {
    rl.question('¿Quieres (1) Registrarte o (2) Iniciar sesión? ', (respuesta) => {
        if (respuesta === '1') {
            registrarUsuario();
        } else if (respuesta === '2') {
            iniciarSesion();
        } else {
            console.log('Opción no válida.');
            rl.close();
        }
    });
}

menu();
