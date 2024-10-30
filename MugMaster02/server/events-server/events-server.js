const { setPaginaActual, getPaginaActual, generarFlecha, flechasBoard, delay } = require('../utils/helpers.js');
/*********************
  Handler para los diferentes mensajes que escucha el server
********************/

//Aqui me avisa el front que el conteo del loading termino
const terminaLoading = async (socket, io) => {
	//se debe emitir al front que avance a la siguiente screen <Juego>
	console.log('El front me avisa que termina conteo');

	setPaginaActual('gamePage');
	console.log('paginaActual<terminaLoading>', getPaginaActual());

	socket.emit('navigateTo', 'gamePage');

	const dataFlecha = generarFlecha();
	flechasBoard[dataFlecha.columna].push(dataFlecha);
	console.log('flechasBoard<terminaLoading>', flechasBoard);

	await delay(1000);
	socket.emit('nuevaFlecha', dataFlecha);
	await delay(1000);
	socket.emit('nuevaFlecha', generarFlecha());
	await delay(1000);
	socket.emit('nuevaFlecha', generarFlecha());
	//socket.emit("botonPulsado", dataFlecha);
};

const changeScreen = (socket, io) => {
	//socket.emit("navigateTo", "tutorialPage");
};

const verifyKeys = (socket, db, io) => {};

const animationKeys = (socket, db, io) => {};

module.exports = {
	terminaLoading,

	changeScreen,
	verifyKeys,
	animationKeys,
};
