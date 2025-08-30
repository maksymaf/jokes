const express = require('express');
const JokeController = require('../controllers/controllers.joke.js');
const UserController = require('../controllers/controllers.users.js');
const { isAuth } = require('../middleware/isAuth.js');
const jokeRouter = express.Router();

jokeRouter.get('/', isAuth,  UserController.getRootPage);
jokeRouter.get('/register', UserController.getRegisterPage);
jokeRouter.get('/login', UserController.getLoginPage);
jokeRouter.post('/register', UserController.addUser);
jokeRouter.post('/login', UserController.loginUser);

jokeRouter.post('/add-joke', JokeController.addJoke);
jokeRouter.get('/random-joke', JokeController.getRandomJoke);

module.exports = jokeRouter;