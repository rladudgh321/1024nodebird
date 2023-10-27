const { User, Post } = require('../models');
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
    passport.authenticate('local', (err,user,info) => {
        if(err) {
            console.error(err);
            return next(err);
        }
        if(info) {
            console.log('info', info);
            return res.status(403).send(info.message);
        }
        return req.login(user, async (err) => {
            if(err) {
                console.error(err);
                return next(err);
            }
            const userWithoutPwd = await User.findOne({
                where : { id: user.id },
                attributes:['id', 'nickname', 'email', 'description'],
                include:[{
                    model:Post,
                }, {
                    model:User,
                    as:'Followings',
                }, {
                    model:User,
                    as:'Followers',
                }, {
                    model:Post,
                    as:'Liked'
                }]
            })
            return res.status(200).json(userWithoutPwd);
        });
    })(req,res,next);
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


exports.changeNicknameEdit = async (req,res,next) => {
    try {
        const user = await User.findOne({ where : { id: req.user.id } });
        if(!user) {
            return res.status(403).send('자신 외 다른 사람의 닉네임을 변경 할 수 없습니다');
        }
        await User.update({
            nickname:req.body.nickname,
        }, {
            where: { id: user.id },
        });
        res.status(200).json(req.body.nickname);
    } catch (err) {
        console.error(err);
        next(err);
    }
}