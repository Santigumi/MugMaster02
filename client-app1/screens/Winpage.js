import { router } from '../routes.js';
import socket from '../socket.js';

export default function winPage() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <section>
        <img id="titule" src="/Resources/img/Mug.png">
        <div id="center">
        <img id="text" src="/Resources/img/Win.png">
        <div id="buttons">
        <div id="backPage">
		<img id="arrows" src="/Resources/img/Arrows.png">
		<p id="next">Next</p>
		</div>  
        </div>
        </div>  
        </section>
    `;
}
