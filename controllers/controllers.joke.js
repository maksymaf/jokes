const Joke = require('../models/model.joke');

class JokeController {
    async addJoke(req, res) {
        const { joke } = req.body;
        const jokeObj = new Joke({joke});
        await jokeObj.save();
        res.sendStatus(201);
    }

    async getRandomJoke(req, res) {
        const jokes = await Joke.find({});
        res.status(200).json({joke: jokes[Math.floor(Math.random() * jokes.length)]});
    }
}

module.exports = new JokeController();