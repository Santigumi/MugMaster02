import { router } from '../routes.js';
import socket from '../socket.js';
import { flechasBoard, delay } from '../utils/helpers.js';

let alturaContenedor;

export default async function gamePage() {
	console.log('Render gamePage');

	const app = document.getElementById('app');
	app.innerHTML = `
      <div id="contenedor" class="contenedor">
        <h1>Game</h1>
        <p>inserte a Mug y los triangulos</p>
        <button id="winPage">:)</button>
        <button id="losePage">:(</button>
      </div>
    `;

	/*   document.getElementById("winPage").addEventListener("click", () => {
    router.navigateTo("/screen5");
    // socket.emit("event2");
  }); */
	const contenedor = document.getElementById('contenedor');
	console.log(contenedor);

	alturaContenedor = contenedor.clientHeight;

	for (let index = 0; index < (alturaContenedor * 2) / 10; index++) {
		await renderBoard();
	}

	/*   document.getElementById("losePage").addEventListener("click", () => {
    router.navigateTo("/screen6");
    // socket.emit("event2");
  }); */
}

function crearFlecha(buttonData) {
	const elemento = document.createElement('div');
	const { flecha, buttonId } = buttonData;

	elemento.setAttribute('id', `tablero${buttonId}`);
	elemento.setAttribute('class', 'tablero');
	if (flecha == 1) elemento.style.backgroundColor = '#ff0000';
	if (flecha == 2) elemento.style.backgroundColor = '#00ff00';
	if (flecha == 3) elemento.style.backgroundColor = '#0000ff';
	const valorFila = elemento.posy;
	elemento.style.top = valorFila + 'px';
	const valorColumna = elemento.posx;
	elemento.style.left = valorColumna + 'px';

	const contenedor = document.getElementById('contenedor');
	contenedor.appendChild(elemento);
}

function getFlecha(buttonId) {
	return document.getElementById(`tablero${buttonId}`);
}

async function renderBoard() {
	await delay(50);
	const deltaY = 10;
	console.log('Entra a renderBoard');
	for (let k = 0; k < flechasBoard.length; k++) {
		for (let p = 0; p < flechasBoard[k].length; p++) {
			const element = flechasBoard[k][p];

			console.log('renderBoard', element);
			const flechaCreada = getFlecha(element.buttonId);

			// Movimiento vertical
			const valorFila = element.posy;
			flechaCreada.style.top = valorFila + 'px';
			console.log('renderBoard<valorFila>', valorFila);

			// Ubicar la columna sobre la bajada de la imagen
			const valorColumna = element.posx;
			flechaCreada.style.left = valorColumna + 'px';
			console.log('renderBoard<valorColumna>', valorColumna);

			flechasBoard[k][p].posy = valorFila + deltaY;
		}
	}
}

socket.on('botonPulsado', (buttonData) => {
	console.log('Pulsaron el boton1: ', buttonData);
	// TODO Se debe procesar el boton pulsado repecto del juego
});

socket.on('nuevaFlecha', (buttonData) => {
	const buttonId = Math.floor(Math.random() * 1000000);
	const buttonDataId = { ...buttonData, buttonId };
	console.log('Pulsaron el boton2: ', buttonDataId, buttonId);
	// TODO Se debe procesar el boton pulsado repecto del juego

	const base = 100;
	buttonDataId.posx = base + buttonData.columna * 100;
	// Metemos la flecha a la matriz del board
	const posicionFlecha = flechasBoard[buttonData.columna].length;
	console.log('gamePage <posicionFlecha>', posicionFlecha);
	flechasBoard[buttonData.columna].push(buttonDataId);
	console.log('gamePage <flechasBoard>', flechasBoard);

	crearFlecha(buttonDataId);
});
