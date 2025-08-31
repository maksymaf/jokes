const Joke = require('../models/model.joke');

class JokeController {
    async addJoke(req, res) {
        const { joke } = req.body;
        const jokeObj = new Joke({joke, author: req.session.email});
        await jokeObj.save();
        res.redirect('/add-joke')
    }

    async getRandomJoke(req, res) {
        const jokes = await Joke.find({verified: true});
        res.status(200).json({joke: jokes[Math.floor(Math.random() * jokes.length)]});
    }

    async getAllJokes(req, res) {
        const jokes = await Joke.find({});
        res.status(200).json({jokes});
    }

    async deleteJoke(req, res) {
        const {id} = req.params;
        const deletedJoke = await Joke.findByIdAndDelete(id, {new: true});
        res.sendStatus(200);
    }

    async updateJoke(req, res) {
        const {id} = req.params;
        const updatedJoke = await Joke.findByIdAndUpdate(id, {verified: true});
        res.sendStatus(200);
    }
}

module.exports = new JokeController();