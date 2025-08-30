const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Joke = require('./models/joke');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/add-joke', async (req, res) => {
    const { joke } = req.body;
    const jokeObj = new Joke({joke});
    await jokeObj.save();

    res.sendStatus(201);
});

app.get('/random-joke', async (req, res) => {
    const jokes = await Joke.find({});
    res.status(200).json({joke: jokes[Math.floor(Math.random() * jokes.length)]});
})

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('connected successfuly'))
.catch(() => console.log('connection failed'))

app.listen(PORT);