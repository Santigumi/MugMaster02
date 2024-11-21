
const keyspressed = (socket, db, io) => {
    return (data) => {
      io.emit("showSomething");
      //Aqui se hace la validacion
    };
  };

  module.exports = {
    keyspressed,
  };
  //o se llama el verify o en otro lugar pero debe suceder aqui