//const db = require("../db");
const { sendEmailToLastParticipants } = require('../services/BREVO.JS');

const {
	terminaLoading,
	gameOver,
	volverGame,
	changeScreen,
	verifyKeys,
	animationKeys,
} = require('../events-server/events-server');
//const { reciveKeys, reciveAnimation } = require("../events-users/events-user")
//const { keyspressed } = require("../events-arduino/arduino-events");

// On para cada tipo de mensaje que debe escuchar el server
const serverEvents = (socket, io) => {
	socket.on('submitForm', async () => {
		try {
			await sendEmailToLastParticipants();
			socket.emit('emailSent', { success: true });
		} catch (error) {
			console.error('Error in submit handler:', error);
			socket.emit('emailSent', { success: false, error: error.message });
		}
	});
	socket.on('terminaLoading', () => terminaLoading(socket, io));
	socket.on('gameOver', (tipoGameOver) => gameOver(socket, io, tipoGameOver));
	socket.on('volverGame', () => volverGame(socket, io));
};

/*
const userEvents = (socket, io) => {
  socket.on("event-user", () => reciveKeys(socket, db, io));
  socket.on("event-user", () => reciveAnimation(socket, db, io));
};

const arduinoEvents = (socket, io) => {
  socket.on("event-user", () => keyspressed(socket, db, io));
};
*/

module.exports = {
	serverEvents,
	//userEvents,
	//arduinoEvents,
};
