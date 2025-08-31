const express = require('express');
const JokeController = require('../controllers/controllers.joke.js');
const UserController = require('../controllers/controllers.users.js');
const { isAuth } = require('../middleware/isAuth.js');
const jokeRouter = express.Router();

jokeRouter.get('/',  UserController.getRootPage);
jokeRouter.get('/register', UserController.getRegisterPage);
jokeRouter.get('/login', UserController.getLoginPage);
jokeRouter.post('/register', UserController.addUser);
jokeRouter.post('/login', UserController.loginUser);
jokeRouter.post('/logout', UserController.logoutUser);

jokeRouter.post('/add-joke', isAuth, JokeController.addJoke);
jokeRouter.get('/add-joke', isAuth, UserController.getAddJokePage)
jokeRouter.get('/random-joke', JokeController.getRandomJoke);

jokeRouter.get('/users', UserController.getAllUsers);
jokeRouter.get('/jokes', JokeController.getAllJokes);

jokeRouter.delete('/delete-joke/:id', JokeController.deleteJoke);
jokeRouter.put('/verify-joke/:id', JokeController.updateJoke);

module.exports = jokeRouter;