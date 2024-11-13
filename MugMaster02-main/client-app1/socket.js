import { router } from './routes.js';
import { flechasBoard } from './utils/helpers.js';

// Update this to your server URL
const socket = io('http://localhost:5050', { path: '/real-time' });

socket.on('connect', () => {
	console.log('Connected to Socket.IO server');
});

socket.on('navigateTo', (screen) => {
	console.log('navigateTo:' + screen);
	router.navigateTo(screen);
});

socket.on('resetGame', () => {
	console.log('resetGame:');
	// limpiamos el tablero
	flechasBoard.length = 0;
	console.log('flechasBoard', flechasBoard);

	router.navigateTo('gamePage');
});

export default socket;
