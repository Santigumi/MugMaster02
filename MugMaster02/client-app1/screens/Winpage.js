import { router } from '../routes.js';
import socket from '../socket.js';

export default function winPage() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>Han ganado</h1>
        <p>Felicidades! han ayudado a Mug, para reclamar tu cupon, ambos deben llenar el siguiente formulario</p>
        <button id="nextPage"> qr </button>
    `;

	document.getElementById('nextPage').addEventListener('click', () => {
		router.navigateTo('/screen7');
		// socket.emit("event2");
	});
}
