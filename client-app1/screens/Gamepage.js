
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
	  <div id="player1" class="flechas-column">
		<div id="Figures">	
		</div>
	  </div>
	 
	  <div id="center">
	  	<div id="lineatiempo">
          <div id="lineatiempo-bar"></div>
	    </div>
       
			<div id="lineavida">
          	<div id="lineavida-bar"></div>
        	</div>
        
			<div id="text">
				<p id="aciertos" class="contador">Aciertos: </p>
        		<p id="errores" class="contador">Errores: </p>
			</div>

		<img id="mug" src="/Resources/img/Group4.png">
	  </div>

		<div id="player2" class="flechas-column">
		<div id="Figures2">
		</div>
		</div>
		</div>
    
		<div id="sensor">
			<div id="arrows1">
			<img id="Figure1" data-posicion="1" src="/Resources/img/Left1.png">
			<img id="Figure3" data-posicion="3" src="/Resources/img/Up1.png">			
			<img id="Figure2" data-posicion="2" src="/Resources/img/Right1.png">
			</div>
			<div id="arrows2">
			<img id="Figure4" data-posicion="1" src="/Resources/img/Left1.png">
			<img id="Figure6" data-posicion="3" src="/Resources/img/Up1.png">
			<img id="Figure5" data-posicion="2" src="/Resources/img/Right1.png">
		</div>
		</div>
    `;

	const contenedor = document.getElementById('contenedor');
	alturaContenedor = 600;
	inicioSensor = alturaContenedor -130; 

	const aciertos = document.getElementById('aciertos');

	const errores = document.getElementById('errores');
	
	async function renderBoard() {
		const deltaY = 10; // Velocidad del movimiento de las flechas
	
		while (!gameOver) {
			await delay(50);
			for (let k = 0; k < flechasBoard.length && !gameOver; k++) {
				const element = flechasBoard[k];
				const flechaCreada = getFlecha(element.buttonId);
				if (!flechaCreada) continue;
	
				// Movimiento vertical
				element.posy += deltaY;
				flechaCreada.style.top = element.posy + 'px';
	
				// Verificar si la flecha está en el rango del sensor
				if (element.posy >= inicioSensor && element.posy <= inicioSensor + 100) { // Ajuste de 100 píxeles de tolerancia
					element.enSensor = true;
				} else {
					element.enSensor = false;
				}
	
				// Verificar si la flecha salió de la pantalla
				if (element.posy > alturaContenedor) {
					eliminarFlecha(element.buttonId);
					contadorErrores++;
					validarJuego();
				}
			}
		}
	}
	
	

	
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

function validarSensor(tipoFlecha, jugador) {
    let flechaValida = null;

    for (let k = 0; k < flechasBoard.length; k++) {
        const element = flechasBoard[k];

        // Verificar si la flecha coincide en tipo y está en la zona del sensor
        if (element.flecha === tipoFlecha && element.enSensor) {
            flechaValida = element;
            break;
        }
    }

    if (flechaValida) {
        eliminarFlecha(flechaValida.buttonId); // Elimina la flecha del array y del DOM
        contadorAciertos++;
        console.log('Acierto en el sensor:', tipoFlecha);
    } else {
        contadorErrores++;
        console.log('Error en el sensor:', tipoFlecha);
    }

    // Actualizar la interfaz y verificar fin del juego
    validarJuego();
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


// Ejemplo de cómo utilizar la función cuando creas una flecha
function crearFlecha(buttonData, jugador) {
	const elemento = document.createElement('div');
	elemento.setAttribute('id', `tablero${buttonData.buttonId}`);
	elemento.setAttribute('class', 'tablero');
	
	// Establece la imagen de la flecha
	if (buttonData.flecha === IZQUIERDDA) elemento.style.backgroundImage = "url('/Resources/img/Left.png')";
	if (buttonData.flecha === DERECHA) elemento.style.backgroundImage = "url('/Resources/img/Right.png')";
	if (buttonData.flecha === ARRIBA) elemento.style.backgroundImage = "url('/Resources/img/Up.png')";
	
	elemento.style.backgroundSize = 'cover';
	elemento.style.backgroundRepeat = 'no-repeat';
	elemento.style.backgroundPosition = 'center';
  
	// Ajustar ancho
	const columna = document.getElementById(jugador === 1 ? 'player1' : 'player2');
	elemento.style.width = `${columna.clientWidth / 3}px`;
  
	// Calcular posición de la flecha según la sección
	const seccion = columna.clientWidth / 3;
	let posX = (buttonData.flecha - 1) * seccion;
	elemento.style.left = `${posX}px`;
  
	columna.appendChild(elemento);
  }
  
function getFlecha(buttonId) {
	return document.getElementById(`tablero${buttonId}`);
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
		const contenedor1 = document.getElementById('player1');
		const contenedor2 = document.getElementById('player2');
		
		const anchoContenedor1 = contenedor1.clientWidth;
		const anchoContenedor2 = contenedor2.clientWidth;
	
		// Calcula el margen como un porcentaje del ancho del contenedor (por ejemplo, el 10%)
		// const margen1 = anchoContenedor1 * 0.1;
		// const margen2 = anchoContenedor2 * 0.1;
	
		// Divide el ancho del contenedor entre 3 para obtener el ancho de cada sección
		const seccion1 = anchoContenedor1 / 3;
		const seccion2 = anchoContenedor2 / 3;
	
		if (buttonDataId1.flecha === IZQUIERDDA) {
			buttonDataId1.posx = 0;  // Primera sección
		  } else if (buttonDataId1.flecha === ARRIBA) {
			buttonDataId1.posx = seccion1;  // Segunda sección
		  } else if (buttonDataId1.flecha === DERECHA) {
			buttonDataId1.posx = 2 * seccion1;  // Tercera sección
		  }
		  
		  // Lo mismo para buttonDataId2
		  if (buttonDataId2.flecha === IZQUIERDDA) {
			buttonDataId2.posx = 0;
		  } else if (buttonDataId2.flecha === ARRIBA) {
			buttonDataId2.posx = seccion2;
		  } else if (buttonDataId2.flecha === DERECHA) {
			buttonDataId2.posx = 2 * seccion2;
		  }

		// Flecha para jugardor 1
		flechasBoard.push(buttonDataId1);
		// Flecha para jugardor 2
		flechasBoard.push(buttonDataId2);

		console.log('gamePage <flechasBoard1>', flechasBoard);

		// Se crea en el DOM las flechas
		crearFlecha(buttonDataId1, 1);
		crearFlecha(buttonDataId2, 2);
	}
});


function ajustarTamañoFlechas() {
    const columnas = document.querySelectorAll('.flechas-column');

    columnas.forEach(columna => {
        // Seleccionar flechas dinámicas (si existen)
        const flechas = columna.querySelectorAll('.tablero');
        flechas.forEach(flecha => {
            flecha.style.width = `${columna.clientWidth / 3}px`;  // Un tercio del contenedor
            flecha.style.height = `${columna.clientWidth / 3}px`; // Mantener cuadrado
        });
    });
}

  // Llamar a esta función cada vez que se ajusta el tamaño de la ventana

  window.addEventListener('resize', ajustarTamañoFlechas);


  
  