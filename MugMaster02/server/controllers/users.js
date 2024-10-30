const db = require("../db");
const { getIO } = require("../socket");

const getUsers = async (req, res) => {
  try {
    res.status(200).json(db.users);
    /*
    getIO().emit("event1", "message or object"); // if you want emmit an event from endpoint controller
    */
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUsers = async (req, res) => {
  try {
    const { user } = req.body;
    db.users.push(user);
    res.status(200).json(db.users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUsers, createUsers };
