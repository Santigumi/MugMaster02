// // const { createServer } = require("http");

// // const app = require("./app.js");
// // const { initSocket } = require("./socket.js");

// // const httpServer = createServer(app) // Explicity creates an HTTP server from the Express app

// // // Initialize Socket.IO
// // initSocket(httpServer);

// // httpServer.listen(5050, () => console.log("server starting 🚀🆙✔ on http://localhost:5050"));

// const express = require('express');
// const { createServer } = require('http');
// const { initSocket } = require('./socket.js');
// const path = require('path'); // Add this line

// const app = express();

// let lastButtonPressed = '';

// // Endpoint para recibir los datos del Arduino
// app.post('/button', (req, res) => {
// 	const button = req.query.button; // Leer el parámetro 'button' de la URL
// 	if (button) {
// 		lastButtonPressed = button; // Actualizar el último botón presionado
// 		console.log('Botón presionado:', button);
// 		res.json({ status: 'success', button });
// 	} else {
// 		res.status(400).json({ status: 'error', message: 'No button provided' });
// 	}
// });

// // Endpoint para que Visual Studio consulte qué botón fue presionado
// app.get('/lastButton', (req, res) => {
// 	res.json({ lastButtonPressed });
// });

// const httpServer = createServer(app);

// // Inicializar Socket.IO
// initSocket(httpServer);

// // Iniciar el servidor en el puerto 5050
// httpServer.listen(5050, () => console.log('server starting 🚀🆙✔ on http://localhost:5050'));

// app.use(express.static(path.join(__dirname, '../cliente-app2')));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const express = require('express');
const cors = require('cors'); // Import CORS package
const { createServer } = require('http');
const { initSocket } = require('./socket.js'); // Socket logic
const path = require('path'); // To serve static files

const app = express();

// Enable CORS for all routes
app.use(cors());

// The last button pressed
let lastButtonPressed = '';

// Endpoint to receive data from Arduino
app.post('/button', (req, res) => {
	const button = req.query.button; // Read 'button' parameter from URL
	if (button) {
		lastButtonPressed = button; // Update the last pressed button
		console.log('Button pressed:', button);
		res.json({ status: 'success', button });
	} else {
		res.status(400).json({ status: 'error', message: 'No button provided' });
	}
});

// Endpoint for Visual Studio to check the last pressed button
app.get('/lastButton', (req, res) => {
	res.json({ lastButtonPressed });
});

// Serve static files from the client app directory
app.use(express.static(path.join(__dirname, '../cliente-app2')));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create an HTTP server from the Express app
const httpServer = createServer(app);

// Initialize Socket.IO
initSocket(httpServer);

// Start the server on port 5050
httpServer.listen(5050, () => {
	console.log('server starting 🚀🆙✔ on http://localhost:5050');
});
