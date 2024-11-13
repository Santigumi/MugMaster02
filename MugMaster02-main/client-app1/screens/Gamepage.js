import { router } from '../routes.js';
import socket from '../socket.js';
import { IZQUIERDDA, ARRIBA, DERECHA, MAXERRORRES, MAXCICLOTIEMPO, base1, base2 } from '../utils/constantes.js';
import { flechasBoard, delay, eliminarFlecha } from '../utils/helpers.js';

let alturaContenedor;
let inicioSensor;
let contadorAciertos = 0;
let contadorErrores = 0;
let gameOver = false;
let vidas = MAXERRORRES;

export default async function gamePage() {
	console.log('Render gamePage');
	gameOver = false;
	contadorErrores = 0;
	contadorAciertos = 0;

	let totalVidas = 4;

	const app = document.getElementById('app');
	app.innerHTML = `
      <div id="contenedor" class="contenedor">
        <div id="lineatiempo">
          <div id="lineatiempo-bar"></div>
        </div>
        <div id="lineavida">
          <div id="lineavida-bar"></div>
        </div>
        <h1>Game</h1>
        <p>inserte a Mug y los triangulos</p>
        <button id="winPage">:)</button>
        <button id="losePage">:(</button>
        <p id="aciertos" class="contador">Aciertos: </p>
        <p id="errores" class="contador">Errores: </p>
        <div id="sensor"></div>
      </div>
    `;

	const contenedor = document.getElementById('contenedor');

	alturaContenedor = contenedor.clientHeight;
	inicioSensor = alturaContenedor - 130; // posy de la caja del sensor

	const aciertos = document.getElementById('aciertos');

	const errores = document.getElementById('errores');

	const sensor = document.getElementById('sensor');
	sensor.addEventListener('click', () => {
		// Logica de saber si al llegar una tecla desde el
		// arduino hay una flecha que coincide con tipoflecha
		// dentro del cajon del sensor

		validarSensor();
		aciertos.innerHTML = `Aciertos: ${contadorAciertos}`;
		errores.innerHTML = `Errores: ${contadorErrores}`;
		if (contadorErrores > MAXERRORRES) {
			console.log('Gane Over Errores...died');
			gameOver = true;
			socket.emit('gameOver', { causalGameOver: 2 }); // Game over por Errores
		}
	});

	renderBoard();

	animarTiempo();
}

function animarTiempo() {
	const lineatiempoBar = document.querySelector('#lineatiempo-bar');
	let ciclosTiempo = MAXCICLOTIEMPO; // cuantos segundos dura el juego
	let tiempo = 100;
	const deltaTiempo = Math.floor(tiempo / ciclosTiempo);
	let idIntervalTiempo = setInterval(() => {
		if (gameOver) {
			// detenemos animacion de la barra de tiempo
			clearInterval(idIntervalTiempo);
			console.log('Game Over Vidas .. Lose');
		}
		if (tiempo < 1) {
			clearInterval(idIntervalTiempo);
			console.log('Game Over Time .. Win');
			gameOver = true;
			socket.emit('gameOver', { causalGameOver: 1 }); // Game over por tiempo
		}
		tiempo = tiempo - deltaTiempo;
		if (tiempo < 0) tiempo = 0;
		lineatiempoBar.style.width = tiempo + '%';
		console.log('Tiempo', tiempo);
	}, 1000);
}

function validarSensor(tipoFlecha = IZQUIERDDA, jugador = 1) {
	// Con el tipo flecha y flechasBoard determinar si en
	// el sensor existe una flecha y hace match

	let exito = false;
	let coincide = 0;
	for (let k = 0; k < flechasBoard.length; k++) {
		const element = flechasBoard[k];
		if (element.flecha == tipoFlecha) {
			if (element.posy > inicioSensor && element.posy < alturaContenedor) {
				// esa flecha esta dentro del sensor
				exito = true;
				//const posxFlecha = base1 + element.flecha * (100 + 5);
				if (jugador == 1 && element.posx < base2) {
					coincide = element.buttonId;
					console.log('Exito Jugador 1', jugador);
				}
				if (jugador == 2 && element.posx > base2) {
					coincide = element.buttonId;
					console.log('Exito Jugador 1', jugador);
				}

				//break;
			}
		}
	}
	if (exito) {
		contadorAciertos++;
		console.log('Exito en el sensor', tipoFlecha);
		eliminarFlecha(coincide); // Solo del array no se elimana del DOM
		return;
	}
	contadorErrores++;
	console.log('Error en el sensor', tipoFlecha);
}

function crearFlecha(buttonData) {
	const elemento = document.createElement('div');
	const { flecha, buttonId } = buttonData;

	elemento.setAttribute('id', `tablero${buttonId}`);
	elemento.setAttribute('class', 'tablero');
	if (flecha == 1) elemento.style.backgroundColor = '#ff0000';
	if (flecha == 2) elemento.style.backgroundColor = '#00ff00';
	if (flecha == 3) elemento.style.backgroundColor = '#0000ff';

	const valorFila = buttonData.posy;
	elemento.style.top = valorFila + 'px';

	const valorColumna = buttonData.posx;
	elemento.style.left = valorColumna + 'px';

	const contenedor = document.getElementById('contenedor');
	contenedor.appendChild(elemento);
}

function getFlecha(buttonId) {
	return document.getElementById(`tablero${buttonId}`);
}

async function renderBoard() {
	// Incremento step del movimiento de las flechas
	const deltaY = 10; // pixels del movimiento de las flechas

	while (!gameOver) {
		//console.log('Entra a renderBoard', flechasBoard.length);
		// Tiempo de espera para los refrescos de pantalla
		await delay(50);
		for (let k = 0; k < flechasBoard.length && !gameOver; k++) {
			const element = flechasBoard[k];
			//console.log('renderBoard<element>', element);

			// Obtenemos el objeto del DOM <div>
			const flechaCreada = getFlecha(element.buttonId);
			if (!flechaCreada) continue;
			// Movimiento vertical
			const valorFila = element.posy;
			flechaCreada.style.top = valorFila + 'px';
			//console.log('renderBoard<valorFila>', valorFila);

			// Ubicar la columna sobre la bajada de la imagen
			const valorColumna = element.posx;
			flechaCreada.style.left = valorColumna + 'px';
			//console.log('renderBoard<valorColumna>', valorColumna);

			// Incrementamos para el avance en la siguiente render
			flechasBoard[k].posy = valorFila + deltaY;

			// Validamos si el flecha ya salio de la pantalla para quitarla
			if (valorFila > alturaContenedor) {
				eliminarFlecha(element.buttonId); // Solo del array no se elimana del DOM
				contadorErrores++;
				validarJuego();
				console.log('renderBoard<eliminarFlecha>');
			}
		}
	}
}

function validarJuego() {
	let deltaVidas = 100 / MAXERRORRES;

	const aciertos = document.getElementById('aciertos');
	const errores = document.getElementById('errores');
	const lineavidaBar = document.querySelector('#lineavida-bar');

	aciertos.innerHTML = `Aciertos: ${contadorAciertos}`;
	errores.innerHTML = `Errores: ${contadorErrores}`;

	let ancho = 100 - contadorErrores * deltaVidas;
	lineavidaBar.style.width = ancho + '%';

	if (contadorErrores > MAXERRORRES) {
		console.log('Gane Over Errores...died');
		gameOver = true;
		socket.emit('gameOver', { causalGameOver: 2 }); // Game over por Errores
	}
}

/****************
  Callback de los escuchas - oidos del cliente
***************/
socket.on('botonPulsado', (buttonData) => {
	if (!gameOver) {
		console.log('Pulsaron el boton1: ', buttonData);
		// TODO Se debe procesar el boton pulsado repecto del juego
		let tipoFlecha;
		let jugador;
		if (buttonData == 'Arriba1') {
			tipoFlecha = ARRIBA;
			jugador = 1;
		}
		if (buttonData == 'Izquierda1') {
			tipoFlecha = IZQUIERDDA;
			jugador = 1;
		}
		if (buttonData == 'Derecha1') {
			tipoFlecha = DERECHA;
			jugador = 1;
		}

		if (buttonData == 'Arriba2') {
			tipoFlecha = ARRIBA;
			jugador = 2;
		}
		if (buttonData == 'Izquierda2') {
			tipoFlecha = IZQUIERDDA;
			jugador = 2;
		}
		if (buttonData == 'Derecha2') {
			tipoFlecha = DERECHA;
			jugador = 2;
		}
		console.log('Pulsaron boton tipoflecha: ', tipoFlecha);

		validarSensor(tipoFlecha, jugador);
		validarJuego();
	}
});

socket.on('nuevaFlecha', (buttonData) => {
	if (!gameOver) {
		// Generamos un id para el elemento DOM que representa la flecha
		const buttonId1 = Math.floor(Math.random() * 1000000);
		const buttonId2 = Math.floor(Math.random() * 1000000);

		// Creamos un JSON con los datos que llegan del server
		// adicionando el id
		// Se crea un par de flechas x ser dos jugadores
		const buttonDataId1 = { ...buttonData, buttonId: buttonId1 };
		const buttonDataId2 = { ...buttonData, buttonId: buttonId2 };

		console.log('Llego una nueva flecha: ', buttonDataId1, buttonId1);

		// Ajustamos la posicon de la flecha ya que el server la manda
		// como posx:0 posy:0.

		const margen = 5;
		buttonDataId1.posx = base1 + buttonDataId1.flecha * (100 + margen);
		buttonDataId2.posx = base2 + buttonDataId2.flecha * (100 + margen);

		// Flecha para jugardor 1
		flechasBoard.push(buttonDataId1);
		// Flecha para jugardor 2
		flechasBoard.push(buttonDataId2);

		console.log('gamePage <flechasBoard1>', flechasBoard);

		// Se crea en el DOM las flechas
		crearFlecha(buttonDataId1);
		crearFlecha(buttonDataId2);
	}
});
