import { router, socket } from '../routes.js'; // Importando router y socket

export default function Email() {
	const app = document.getElementById('app');
	app.innerHTML = `
  <h1>¡Felicitaciones!</h1>
            <p>Tu cupón fue enviado a tu correo.</p> `;

	// document.getElementById('nextPage').addEventListener('click', () => {
	// 	socket.emit('changeScreen'); // Emitiendo el evento 'changeScreen' al servidor
	// });

	// Escuchar el evento 'navigateTo' y navegar a la página recibida
// 	socket.on('navigateTo', (screensQR) => {
// 		router.navigateTo(screensQR); // Navegar a la página enviada por el servidor
// 	});
 }
