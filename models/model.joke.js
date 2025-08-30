const mongoose = require('mongoose');

const JokeSchema = new mongoose.Schema({
    joke: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Joke', JokeSchema);