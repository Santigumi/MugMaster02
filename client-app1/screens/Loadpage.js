import { router } from '../routes.js';
import socket from '../socket.js';
import { delay } from '../utils/helpers.js';

export default async function loadPage() {
	const app = document.getElementById('app');

	app.innerHTML = loadPage1();
	await delay(1000);

	app.innerHTML = loadPage2();
	await delay(1000);

	app.innerHTML = loadPage3();
	console.log('Cargamos el conteo 3 y esperamos para emitir');
	await delay(2000);

	socket.emit('terminaLoading');
}

function loadPage1() {
	return `
        <h1>Load page</h1>
        <p id="contador">1...</p>
        <button id="nextPage"> Next </button>
    `;
}
function loadPage2() {
	return `
        <h1>Load page</h1>
        <p id="contador">2...</p>
        <button id="nextPage"> Next </button>
    `;
}
function loadPage3() {
	return `
        <h1>Load page</h1>
        <p id="contador">3...</p>
        <button id="nextPage"> Next </button>
    `;
}
