/*
Simple Express.js Application

Instrucciones:
1. Crea un directorio de proyecto y accede a él:
   mkdir mi-app-express && cd mi-app-express
2. Inicializa npm:
   npm init -y
3. Instala Express:
   npm install express
4. Crea el archivo index.js con el siguiente contenido.
5. Ejecuta la aplicación:
   node index.js
*/

// index.js
// Polyfill para Object.hasOwn si no está disponible (Node < 16.9)
if (typeof Object.hasOwn !== 'function') {
  Object.hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
}

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Hola Mundo desde Express!');
});

// Ruta de ejemplo: API REST básica
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Juan' },
    { id: 2, name: 'María' },
    { id: 3, name: 'Luis' }
  ];
  res.json(users);
});

// Ruta POST para crear un usuario (simulado)
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  // Aquí podrías insertar en una base de datos
  res.status(201).json({ message: 'Usuario creado', user: newUser });
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send('Ruta no encontrada');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Hubo un error en el servidor');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = app;
