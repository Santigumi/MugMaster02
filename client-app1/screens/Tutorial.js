import { router } from '../routes.js';
import socket from '../socket.js';

export default function tutorialPage() {
	const app = document.getElementById('app');
	app.innerHTML = `
		<section>
		<div id="top">
		<img id="titule"src="/Resources/img/How_to_plat.png">
		</div>
		<div id="Center">
        <p>Press the corresponding arrow keys when the arrows rising reach the top marker, follow the rhythm of the music. Keep the coffee balanced by avoiding mistakes.</p>
		<img id="Mug" src="/Resources/img/Mug.png">
        <div id="nextPage">
		<img id="arrows" src="/Resources/img/Arrows.png">
		<p id="next">Next</p>
		</div>
		</div>
		</section>
    `;

	document.getElementById('nextPage').addEventListener('click', () => {
		console.log('emited');
		socket.emit('event1', { message: 'Un nuevo juego ha empezado' });
		router.navigateTo('/screen3');
	});
}
