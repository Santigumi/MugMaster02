const assignRoles = (players) => {
	let shuffled = players.sort(() => 0.5 - Math.random());
	shuffled[0].role = 'marco';
	shuffled[1].role = 'polo-especial';
	for (let i = 2; i < shuffled.length; i++) {
		shuffled[i].role = 'polo';
	}
	return shuffled;
};

const delay = (delayInms) => {
	return new Promise((resolve) => setTimeout(resolve, delayInms));
};

const generarDelayTiempo = (tiempo) => {
	//Math.floor(Math.random() * (max - min + 1) + min);
	const max = 4; // 3 segundos
	const min = 2; // 1 segundo
	const factor = 1500; // milisegundos
	return Math.floor(Math.random() * (max - min + 1) + min) * factor;
};

let paginaActual = 'landingPage';

const getPaginaActual = () => {
	return paginaActual;
};
const setPaginaActual = (nuevaPagina) => {
	paginaActual = nuevaPagina;
};

// Creamos el tablero de juego sin flechas
let flechasBoard = [];
/* for (let k = 0; k < 6; k++) {
	flechasBoard[k] = [];
} */

console.log('flechasBoard', flechasBoard);

const generarFlecha = () => {
	// Genenrar la columna por dinde debe moverse a flecha
	// los posibles valores son 1,2,3
	//Math.floor(Math.random() * (max - min + 1) + min);
	const columna = Math.floor(Math.random() * (3 - 1 + 1) + 1);

	// Generar la figura o tipo de flecha
	// los posibles valores son 1,2,3
	const claseFlecha = Math.floor(Math.random() * (3 - 1 + 1) + 1);

	console.log('generarFlecha', claseFlecha);

	return { flecha: claseFlecha, posx: 0, posy: 0 };
};

//generarFlecha();

module.exports = {
	assignRoles,
	delay,
	getPaginaActual,
	setPaginaActual,
	flechasBoard,
	generarFlecha,
	generarDelayTiempo,
};
