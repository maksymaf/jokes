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
            console.log('Called 1');
            return res.redirect('/register');
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if(!isPasswordCorrect){
            console.log(isPasswordCorrect);
            return res.redirect('/login');
        }

        req.session.email = email; 
        req.session.isAuth = true;
        res.redirect('/');
    }

    getAddJokePage(req, res){
        res.status(200).sendFile(path.join(__dirname, '..', 'public', 'addJoke.html'));
    }

    logoutUser(req, res){
        req.session.destroy(err => {
            
            if (err){
                console.log(err);
                return res.status(500).send('Щось пішло не так 500');
            }
            
            res.clearCookie('connect.sid');
            res.redirect('/login');
        });
    }

    async getAllUsers(req, res){
        const users = await User.find({});
        res.status(200).json(users);
    }
}

module.exports = new UserController();
// 12345