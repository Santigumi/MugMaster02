//const { Events, serverEvents, userEvents, arduinoEvents } = require("./center-events")

const {
	serverEvents,
	//serEvents,
	//arduinoEvents,
} = require('./center-events');
const handleEvents = (socket, io) => {
	serverEvents(socket, io);
	//userEvents(socket, io);
	//arduinoEvents(socket, io);
};

module.exports = { handleEvents };
