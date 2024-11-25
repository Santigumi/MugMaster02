import { router } from '../routes.js';
import socket from '../socket.js';

export default function landingPage() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <section>
        <img id="titule" src='../Resources/img/mug&master.png'>
        <p id="Play">Play</p>
        </section>
    `;
}
