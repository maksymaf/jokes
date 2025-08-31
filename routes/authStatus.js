const express = require('express');
const User = require('../models/model.user');
const Joke = require('../models/model.joke');
const path = require('path');
const apiRouter = express.Router();

apiRouter.get('/check-auth', (req, res) => {
    res.status(200).json({isAuth: !!req.session.isAuth});
});

apiRouter.post('/check-username', async (req, res) => {
    const { email } = req.body;
    const { username } = await User.findOne({email: email});
    res.status(200).json({ info: username });
});

apiRouter.get('/admin', async (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'admin.html'));
})

module.exports = apiRouter;
