const express = require('express');
const cors = require('cors'); // Import CORS package
const { createServer } = require('http');
const { SerialPort, ReadlineParser } = require('serialport');
const path = require('path'); // To serve static files
const { initSocket, getIO } = require('./socket.js');
const { delay, getPaginaActual, setPaginaActual } = require('./utils/helpers.js');
const { createUser } = require('./db/users.js');
require('dotenv/config');


// Creamos servidor express
const app = express();

// Enable CORS for all routes
app.use(cors());

// The last button pressed
let lastButtonPressed = '';
// Para seguimiento de la pag que esta mostrando el front
// let paginaActual = 'landingPage';

/*********
   Leer datos del Arduino
**********/
// Abrir puerto serial por donde escuchar al Arduino
const port = new SerialPort({ path: 'COM4', baudRate: 9600 });  // lo cambie a com  porque en el pc de la U SE LLAMA DE ESTA FORMA (CAMBAIR A COM 4)
// Escuhcar el flujo de datos del puerto
const datosFromArduino = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// CallBack para saber cuando llegan datos
datosFromArduino.on('data', (data) => {
	console.log(`Datos recibidos del Arduino: ${data}`);
	try {
		// Obtenemos el objeto del flujo de datos enviados desde Arduino
		// El JSON es de la forma { "flecha" : 1}
		//TODO: Validar estructura Json
		const buttonData = JSON.parse(data.trim());

		// Validar si se presiono una flecha
		if ('flecha' in buttonData) {
			if (getPaginaActual() === 'landingPage') {
				// Si estamos en tutorialPage le emitimos al front que cambie de screen
				getIO().emit('navigateTo', 'tutorialPage');
				setPaginaActual('tutorialPage');
				console.log('Boton procesado<landingPage>:', buttonData);
				return;
			}

			if (getPaginaActual() === 'tutorialPage') {
				// Si estamos en tutorialPage le emitimos al front que cambie de screen
				getIO().emit('navigateTo', 'loadPage');
				setPaginaActual('loadPage');
				console.log('Boton procesado<tutorialPage>:', buttonData);
				return;
			}

			if (getPaginaActual() === 'loadPage') {
				// Si estamos en loadPage y pulsa botones no hacemos nada
				// hasta que termine la secuencia de animacion en el front
				console.log('Boton procesado<loadPage>:', buttonData);
				return;
			}

			if (getPaginaActual() === 'gamePage') {
				// Si estamos en gamePage le emitimos al front el boton pulsado
				getIO().emit('botonPulsado', buttonData.flecha);
				console.log('Boton procesado<gamePage>:', buttonData);
				return;
			}

			console.log('Boton procesad <SinPage>:', buttonData);
		}
	} catch (err) {
		console.error('Error al parsear JSON:', err);
	}
});

// Endpoint para recibir los datos del Arduino cuando sea por WiFi
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

// Endpoint para disparar secuencia de pantallas en el front
// Para hacer pruebas
app.get('/test', async (req, res) => {
	res.send('<h2>Test iniciado</h2>');

	await delay(3000);
	console.log('landingPage');
	getIO().emit('navigateTo', '/');

	await delay(2000);
	console.log('tutorialPage');
	getIO().emit('navigateTo', 'tutorialPage');

	await delay(2000);
	console.log('loadPage');
	getIO().emit('navigateTo', 'loadPage');

	console.log('paginaActual<test>', getPaginaActual());

	console.log('Timers programados...');
});

app.get('/test2', (req, res) => {
	res.send(`<h2>Test iniciado</h2><p>${getPaginaActual()}</p>`);
});

// Endpoints para clientes específicos
app.use('/mugmaster', express.static(path.join(__dirname, '../client-app1')));  // Sirve archivos estáticos de la carpeta 'Mugmaster'
app.use('/mugmasterform', express.static(path.join(__dirname, '../cliente-app2')));  // Sirve archivos estáticos de la carpeta 'MugmasterForm'

// Crear un endpoint para enviar datos a cada cliente específico
app.post('/mugmaster/submit', (req, res) => {
    const data = req.body; // Asume que los datos vienen en el cuerpo de la solicitud
    console.log('Datos recibidos para Mugmaster:', data);

    // Aquí puedes agregar la lógica que desees para manejar los datos
    res.json({ status: 'success', message: 'Datos recibidos para Mugmaster' });
});

app.post('/mugmasterform/submit', (req, res) => {
    const data = req.body; // Asume que los datos vienen en el cuerpo de la solicitud
    console.log('Datos recibidos para MugmasterForm:', data);

    // Aquí puedes agregar la lógica que desees para manejar los datos
    res.json({ status: 'success', message: 'Datos recibidos para MugmasterForm' });
});

// Configurar Express para servir archivos estáticos de la carpeta 'node_modules'
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/Resources', express.static('Resources'));
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create an HTTP server from the Express app
const httpServer = createServer(app);

// Initialize Socket.IO
initSocket(httpServer);

const userInfoArray = [];

getIO().on('connection', (socket) => {
	socket.on('submitNames', async (data) => {
		userInfoArray.push(data);
		await createUser(data);
		console.log('User info added:', data);
		console.log('Current user info array:', userInfoArray);
	});
});

const surveyResponses = [];


// socket.on('submitForm', (data) => {
// 	surveyResponses.push(data);
// 	console.log('Survey response added:', data);
// 	console.log('Current survey responses:', surveyResponses);
// });

// Your existing socket event handlers...

// Start the server on port 5050
httpServer.listen(process.env.PORT, () => {
	console.log(`server starting 🚀🆙✔ on http://localhost:${process.env.PORT}`);
});
