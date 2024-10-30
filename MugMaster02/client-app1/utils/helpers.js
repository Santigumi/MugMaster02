// Creamos el tablero de juego sin flechas
const flechasBoard = [];
for (let k = 0; k < 6; k++) {
	flechasBoard[k] = [];
}

const delay = (delayInms) => {
	return new Promise((resolve) => setTimeout(resolve, delayInms));
};

export { flechasBoard, delay };
