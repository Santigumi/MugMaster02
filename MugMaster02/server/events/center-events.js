//const db = require("../db");

const {
	terminaLoading,

	changeScreen,
	verifyKeys,
	animationKeys,
} = require('../events-server/events-server');
//const { reciveKeys, reciveAnimation } = require("../events-users/events-user")
//const { keyspressed } = require("../events-arduino/arduino-events");

// On para cada tipo de mensaje que debe escuchar el server
const serverEvents = (socket, io) => {
	socket.on('terminaLoading', () => terminaLoading(socket, io));

	//socket.on("changeScreen", () => changeScreen(socket, io));
	//socket.on("event-user", () => verifyKeys(socket, db, io));
	//socket.on("event-user", () => animationKeys(socket, db, io));

	//socket.on("terminaAnimacion", () => {});
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
