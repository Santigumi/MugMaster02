import { router } from '../routes.js';
import socket from '../socket.js';

export default function landingPage() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>Mug master</h1>
        <p>Participa con tu pareja y gana un cupón de un combo para dos</p>
        <p>Oprime cualquier boton para continuar</p>
        <button id="nextPage">(Boton invisible)</button>
    `;

	document.getElementById('nextPage').addEventListener('click', () => {
		socket.emit('changeScreen');
	});

	/* socket.on("navigateTo", (screen) => {
    console.log("navigateTo<Landingpage>:" + screen);
    router.navigateTo(screen);
  }); */
}
