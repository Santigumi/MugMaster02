const {
	setPaginaActual,
	getPaginaActual,
	generarFlecha,
	flechasBoard,
	delay,
	generarDelayTiempo,
} = require('../utils/helpers.js');

/*********************
  Handler para los diferentes mensajes que escucha el server
********************/

//Aqui me avisa el front que el conteo del loading termino
const terminaLoading = async (socket, io) => {
	//se debe emitir al front que avance a la siguiente screen <Juego>
	console.log('El front me avisa que termina conteo');
	console.log('paginaActual<terminaLoading>', getPaginaActual());

	socket.emit('navigateTo', 'gamePage');
	setPaginaActual('gamePage');

	generarFlechas(socket);
};

const gameOver = (socket, io, tipoGameOver) => {
	console.log('Front me avisa de un game Over', tipoGameOver);

	if (tipoGameOver.causalGameOver == 1) {
		//Win
		console.log('winPage');
		socket.emit('navigateTo', 'winPage');
		setPaginaActual('winPage');
		flechasBoard.length = 0;
		return;
	}

	// Emitimos al front mensaje para que cambie de pantalla a losePage
	console.log('losePage');
	socket.emit('navigateTo', 'losePage');
	setPaginaActual('losePage');
	flechasBoard.length = 0;
};

const volverGame = (socket, io) => {
	console.log('Front me avisa de volver a jugar');

	// Emitimos al front mensaje para que cambie de pantalla a losePage
	socket.emit('resetGame');
	setPaginaActual('gamePage');

	generarFlechas(socket);
};

async function generarFlechas(socket) {
	while (getPaginaActual() == 'gamePage') {
		let temporizar = generarDelayTiempo();
		console.log('delayTiempo', temporizar);

		let dataFlecha = generarFlecha();
		//dataFlecha.flecha = 2;
		flechasBoard.push(dataFlecha);
		await delay(temporizar);
		socket.emit('nuevaFlecha', dataFlecha);
	}
}

async function generarFelchasDummy(socket) {
	//let temporizar = Math.floor(Math.random() * 10 + 1) * 500;
	//Math.floor(Math.random() * (max - min + 1) + min);
	let temporizar = Math.floor(Math.random() * (3 - 1 + 1) + 1);
	let dataFlecha = generarFlecha();
	flechasBoard.push(dataFlecha);
	await delay(temporizar * 500);
	socket.emit('nuevaFlecha', dataFlecha);
	console.log('flechasBoard<terminaLoading>', flechasBoard);

	dataFlecha = generarFlecha();
	flechasBoard.push(dataFlecha);
	temporizar = Math.floor(Math.random() * (3 - 1 + 1) + 1);
	await delay(temporizar * 500);
	socket.emit('nuevaFlecha', dataFlecha);
	console.log('flechasBoard<terminaLoading>', flechasBoard);

	dataFlecha = generarFlecha();
	flechasBoard.push(dataFlecha);
	temporizar = Math.floor(Math.random() * (3 - 1 + 1) + 1);
	await delay(temporizar * 500);
	socket.emit('nuevaFlecha', dataFlecha);
	console.log('flechasBoard<terminaLoading>', flechasBoard);

	// segunda ronda
	dataFlecha = generarFlecha();
	flechasBoard.push(dataFlecha);
	temporizar = Math.floor(Math.random() * (3 - 1 + 1) + 1);
	await delay(temporizar * 500);
	socket.emit('nuevaFlecha', dataFlecha);
	console.log('flechasBoard<terminaLoading>', flechasBoard);

	dataFlecha = generarFlecha();
	flechasBoard.push(dataFlecha);
	temporizar = Math.floor(Math.random() * (3 - 1 + 1) + 1);
	await delay(temporizar * 500);
	socket.emit('nuevaFlecha', dataFlecha);
	console.log('flechasBoard<terminaLoading>', flechasBoard);

	dataFlecha = generarFlecha();
	flechasBoard.push(dataFlecha);
	temporizar = Math.floor(Math.random() * (3 - 1 + 1) + 1);
	await delay(temporizar * 500);
	socket.emit('nuevaFlecha', dataFlecha);
	console.log('flechasBoard<terminaLoading>', flechasBoard);

	// tercera ronda
	dataFlecha = generarFlecha();
	flechasBoard.push(dataFlecha);
	temporizar = Math.floor(Math.random() * (3 - 1 + 1) + 1);
	await delay(temporizar * 500);
	socket.emit('nuevaFlecha', dataFlecha);
	console.log('flechasBoard<terminaLoading>', flechasBoard);

	dataFlecha = generarFlecha();
	flechasBoard.push(dataFlecha);
	temporizar = Math.floor(Math.random() * (3 - 1 + 1) + 1);
	await delay(temporizar * 500);
	socket.emit('nuevaFlecha', dataFlecha);
	console.log('flechasBoard<terminaLoading>', flechasBoard);

	dataFlecha = generarFlecha();
	flechasBoard.push(dataFlecha);
	temporizar = Math.floor(Math.random() * (3 - 1 + 1) + 1);
	await delay(temporizar * 500);
	socket.emit('nuevaFlecha', dataFlecha);
	console.log('flechasBoard<terminaLoading>', flechasBoard);
}

module.exports = {
	terminaLoading,
	gameOver,
	volverGame,
};
