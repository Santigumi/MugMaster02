const db = require('../db');
const { getIO } = require('../socket');

const getUsers = async (req, res) => {
	try {
		// res.status(200).json(db.users);
		/*
    getIO().emit("event1", "message or object"); // if you want emmit an event from endpoint controller
    */

		const { data, error } = await supabase.from('usuarios').select();

		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const createUsers = async (req, res) => {
	try {
		const { user } = req.body;
		// db.users.push(user);
		const { data, error } = await supabase
			.from('countries')
			.insert({ nombre1: user.name1, correo1: user.email1, nombre2: user.name2, correo2: user.email2 })
			.select();

		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = { getUsers, createUsers };
