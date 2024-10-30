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

let paginaActual = 'landingPage';

const getPaginaActual = () => {
	return paginaActual;
};
const setPaginaActual = (nuevaPagina) => {
	paginaActual = nuevaPagina;
};

// Creamos el tablero de juego sin flechas
const flechasBoard = [];
for (let k = 0; k < 6; k++) {
	flechasBoard[k] = [];
}

// Data de prueba
/* const dataFlecha = { felcha: 1, posx: 0, posy: 0 };
flechasBoard[0].push(dataFlecha);
flechasBoard[0].push(dataFlecha);
flechasBoard[0].push(dataFlecha);
flechasBoard[1].push(dataFlecha);
flechasBoard[2].push(dataFlecha); */

console.log('flechasBoard', flechasBoard);

const generarFlecha = () => {
	// Genenrar la columna por dinde debe moverse a flecha
	// los posibles valores son 1,2,3
	//Math.floor(Math.random() * (max - min + 1) + min);
	const columna = Math.floor(Math.random() * (3 - 1 + 1) + 1);

	// Generar la figura o tipo de flecha
	// los posibles valores son 1,2,3
	const claseFlecha = Math.floor(Math.random() * (3 - 1 + 1) + 1);

	console.log('generarFlecha', columna - 1, claseFlecha);

	return { flecha: claseFlecha, columna: columna - 1, posx: 0, posy: 0 };
};

generarFlecha();

module.exports = {
	assignRoles,
	delay,
	getPaginaActual,
	setPaginaActual,
	flechasBoard,
	generarFlecha,
};
