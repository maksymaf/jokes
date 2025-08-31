const mongoose = require('mongoose');

const JokeSchema = new mongoose.Schema({
    joke: {
        type: String,
        required: true,
        trim: true
    },
    verified: {
        type: Boolean,
        required: true,
        default: false,
    },
    author: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Joke', JokeSchema);
