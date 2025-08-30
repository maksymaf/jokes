const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('../models/model.user');

class UserController {
    getRootPage(req, res){
        res.status(200).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    }

    getRegisterPage(req, res){
        res.status(200).sendFile(path.join(__dirname, '..', 'public', 'register.html'));        
    }

    getLoginPage(req, res){
        res.status(200).sendFile(path.join(__dirname, '..', 'public', 'login.html'));
    }

    async addUser(req, res){
        const { username, email, password } = req.body;
        
        let candidate = await User.findOne({email});
        console.log(candidate);
        if(candidate){
            return res.redirect('/login');
        }

        const hashedPassword = bcrypt.hashSync(password, 7);
        candidate = new User({username, email, password: hashedPassword});
        await candidate.save();

        res.redirect('/login');
    }

    async loginUser(req, res){
        const { email, password } = req.body;

        let user = await User.findOne({email});

        if (!user) {
            res.redirect('/register');
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if(!isPasswordCorrect){
            res.redirect('/login');
        }

        req.session.isAuth = true;
        res.redirect('/');
    }
}

module.exports = new UserController();