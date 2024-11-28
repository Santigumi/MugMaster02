// Creamos el tablero de juego sin flechas
let flechasBoard = [];
/* for (let k = 0; k < 6; k++) {
  flechasBoard[k] = [];
} */

const delay = (delayInms) => {
	return new Promise((resolve) => setTimeout(resolve, delayInms));
};

function eliminarFlecha(flechaId) {
	const filtrado = flechasBoard.filter((e) => e.buttonId !== flechaId);
	flechasBoard = [...filtrado];
	//console.log("Nuevo flechasBoard", flechasBoard);

	const flechaElemento = document.getElementById(`tablero${flechaId}`);
    if (flechaElemento) {
        flechaElemento.parentNode.removeChild(flechaElemento);
    }
	console.log("Nuevo flechasBoard", flechasBoard);
}

export { flechasBoard, delay, eliminarFlecha };
