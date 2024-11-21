import { router } from '../routes.js';
import socket from '../socket.js';

export default function qrPage() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>Formulario</h1>
        <p>Llenen el siguiente formulario para reclamar su cupon</p>
        <button id="goToInicio"> *Inicio* </button>
    `;

	document.getElementById('goToInicio').addEventListener('click', () => {
		socket.emit('volverGame');
	});
}
