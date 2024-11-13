const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();

// Define routes and link them to controller methods
router.get('/users', usersController.getUsers);
router.post('/users', usersController.createUsers);
// router.post('/another-endpoint-example', endpointController.controllerFunction);



module.exports = router;