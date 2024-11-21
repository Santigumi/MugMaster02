import { router } from '../routes.js';
import socket from '../socket.js';

export default function winPage() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>Han ganado</h1>
        <p>Felicidades! han ayudado a Mug, para reclamar tu cupon, ambos deben llenar el siguiente formulario</p>
        <button id="qrPage"> QR </button>
    `;

	document.getElementById('qrPage').addEventListener('click', () => {
		router.navigateTo('/qrPage');
		// socket.emit("event2");
	});
}
