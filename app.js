const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongo');
const path = require('path');
const mongoose = require('mongoose');
const jokeRouter = require('./routes/routes.joke');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoDBStore.create({mongoUrl: process.env.MONGODB_URI}),
    cookie: {
        expires: 1000 * 60 * 60 * 24 // 1day
    }
}));
app.use('/', jokeRouter);
app.use(express.static(path.join(__dirname, 'public')))


mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('connected to database successfuly');
    app.listen(PORT, () => {
        console.log(`server is listening on port ${PORT}`);
    });
})
.catch(() => console.log('connection failed'))
