const { User } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.signup = async (req,res,next) => {
    const { email, password, nickname, description } = req.body;
    try {
        const exUser = await User.findOne({
            where : { email }
        });
        if(exUser) {
            return res.status(403).send('존재하는 이메일 주소입니다');
        }
        const hash = await bcrypt.hash(password,12);
        await User.create({
            email,
            password:hash,
            nickname,
            description,
        });
        res.status(201).send('회원가입 ok');
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.login = (req,res,next) => {
    passport.use(passport.authenticate('local', (err,user,info) => {
        if(err) {
            console.error(err);
            return next(err);
        }
        if(info) {
            console.log('info', info);
            return res.status(403).send(info.message);
        }
        return req.login(user, (err) => {
            if(err) {
                console.error(err);
                return next(err);
            }
            return res.status(200).send('로그인 ok');
        });
    }));
}

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            console.error(err);
            next(err);
        }
        return res.status(200).send('로그아웃 ok');
    })
}