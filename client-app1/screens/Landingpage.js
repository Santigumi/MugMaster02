import { router } from '../routes.js';
import socket from '../socket.js';

export default function landingPage() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <section>
        <img id="titule" src='../Resources/img/mug&master.png'>
        <p>Participate with your partner and win a coupon for a combo for two</p>
        <p id="Play">Play</p>
        </section>
    `;

	document.getElementById('nextPage').addEventListener('click', () => {
		socket.emit('changeScreen');
	});

	/* socket.on("navigateTo", (screen) => {
    console.log("navigateTo<Landingpage>:" + screen);
    router.navigateTo(screen);
  }); */
}
