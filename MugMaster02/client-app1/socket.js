import { router } from './routes.js';

// Update this to your server URL
const socket = io('http://localhost:5050', { path: '/real-time' });

socket.on('connect', () => {
	console.log('Connected to Socket.IO server');
});

socket.on('navigateTo', (screen) => {
	console.log('navigateTo:' + screen);
	router.navigateTo(screen);
});

export default socket;
