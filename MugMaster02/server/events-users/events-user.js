// eventsExampleHandlers.js

const { utilFuntion1, utilFuntion2 } = require("../utils/helpers");

// Assuming db and io are required or passed in some way to be accessible
const reciveKeys = (socket, db, io) => {
  //socket.on("sendKeys")
};

const reciveAnimation = (socket, db, io) => {
  //socket.on("animationKeys")
};

module.exports = {
  reciveKeys,
  reciveAnimation,
};
