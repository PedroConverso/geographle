import fs from 'fs';
import readline from 'readline';

// Ruta al archivo JSON
const filePath = 'C:/Users/49123768/Documents/GitHub/proyecto-3-geographle/backend/users.json';

// Función para leer usuarios
function leerUsuarios() {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo de usuarios:', error);
        return [];
    }
}

// Función para guardar usuarios
function guardarUsuarios(usuarios) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));
    } catch (error) {
        console.error('Error al guardar el archivo de usuarios:', error);
    }
}

// Configurar readline para entrada del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Registro de usuario
function registrarUsuario() {
    rl.question('Ingresa un nombre de usuario: ', (nombreUsuario) => {
        rl.question('Ingresa una contraseña: ', (contrasena) => {
            const usuarios = leerUsuarios();
            usuarios.push({ nombreUsuario, contrasena });
            guardarUsuarios(usuarios);
            console.log('Usuario registrado exitosamente!');
            rl.close();
        });
    });
}

// Inicio de sesión
function iniciarSesion() {
    rl.question('Ingresa tu nombre de usuario: ', (nombreUsuario) => {
        rl.question('Ingresa tu contraseña: ', (contrasena) => {
            const usuarios = leerUsuarios();
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
