import { router, socket } from '../routes.js'; // Importando router y socket

export default function Landingform() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>An error has occurred!</h1>
        <p>Coupon failed to load. Please try again later.</p>

        <button id="retryButton">Retry</button>
        <button id="nextPage">Go to QR Page</button>
    `;

	document.getElementById('retryButton').addEventListener('click', () => {
		// Aquí puedes agregar la lógica para intentar recargar o solucionar el problema
		socket.emit('retryCouponLoad'); // Emitir un evento de retry para volver a intentar
	});

	document.getElementById('nextPage').addEventListener('click', () => {
		socket.emit('changeScreen'); // Emitiendo el evento 'changeScreen' al servidor
	});

	// Escuchar el evento 'navigateTo' y navegar a la página recibida
	socket.on('navigateTo', (screensQR) => {
		router.navigateTo(screensQR); // Navegar a la página enviada por el servidor
	});
}
