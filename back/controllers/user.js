const { User, Post, Image, Comment } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');

exports.signup = async (req,res,next) => {
    try {
        const { email, password, nickname, description } = req.body;
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
            return res.status(403).send(info.message);
        }
        return req.login(user, async (err) => {
            if(err) {
                console.error(err);
                return next(err);
            }
            try {
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
            } catch (err) {
                console.error(err);
                next(err);
                req.session.destroy();
            }
        });
    })(req,res,next);
}

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            console.error(err);
            next(err);
        }
        req.session.destroy();
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
            nickname:req.body.editName,
            description:req.body.editText
        }, {
            where: { id: user.id },
        });
        res.status(200).json({nickname:req.body.editName, description:req.body.editText});
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.loadMyInfo = async (req,res,next) => {
    try {
        if(req.user){
            const user = await User.findOne({
                where: { id: req.user.id },
                attributes:{
                    exclude:['password']
                },
                include:[{
                    model:Post,
                },{
                    model: User,
                    as:'Followings'
                }, {
                    model:User,
                    as:'Followers'
                }]
            })
            return res.status(200).json(user);
        } else {
            return res.status(200).json(null);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.loadUserInfo = async (req,res,next) => {
    try {
            const user = await User.findOne({
                where: { id: req.params.userId },
                attributes:{
                    exclude:['password']
                },
                include:[{
                    model:Post,
                },{
                    model: User,
                    as:'Followings'
                }, {
                    model:User,
                    as:'Followers'
                }]
            })
            if(user) {
                const data = user.toJSON();
                data.Posts = data.Posts.length;
                data.Followings = data.Followings.length;
                data.Followers = data.Followers.length;
                return res.status(200).json(data);
            } else {
            return res.status(404).send('존재하지 않은 유저입니다');
            }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.following = async(req,res,next) => {
    try {
        const user = await User.findOne({
            where: { id: parseInt(req.params.userId, 10) },
            attributes:{
                exclude:['password']
            }
        });
        if(!user){
            return res.status(403).send('없는 사용자입니다');
        }
        await user.addFollowers(req.user.id);
        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
}
exports.unfollowing = async(req,res,next) => {
    try {
        const user = await User.findOne({
            where: { id: parseInt(req.params.userId, 10) },
            attributes:{
                exclude:['password']
            }
        });
        if(!user){
            return res.status(403).send('없는 사용자입니다');
        }
        await user.removeFollowers(req.user.id);
        return res.status(200).json(user.id);
    } catch (err) {
        console.error(err);
        next(err);
    }
}
exports.removeFollower = async(req,res,next) => {
    try {
        const user = await User.findOne({
            where: { id: parseInt(req.params.userId, 10) },
            attributes:{
                exclude:['password']
            }
        });
        if(!user){
            return res.status(403).send('없는 사용자입니다');
        }
        await user.removeFollowings(req.user.id);
        return res.status(200).json(user.id);
    } catch (err) {
        console.error(err);
        next(err);
    }
}


//router.get('/:userId/posts', loadUserPosts);
exports.loadUserPosts = async (req,res,next) => {
    try {
        const user = await User.findOne({ where: { id: parseInt(req.params.userId, 10) } });
        if(user){
            const where = {};
            if(parseInt(req.query.lastId, 10)) {
                where.id = { [Op.lt] : parseInt(req.query.lastId, 10)  };
            }
            const posts = await user.getPosts({
                where,
                limit:10,
                order:[['createdAt', 'DESC']],
                include:[{
                    model:User,
                    attributes:{
                        exclude:['password'],
                    }
                },{
                    model:User,
                    as:'Likers',
                    attributes:['id'],
                },{
                    model:Image
                }, {
                    model:Comment,
                    include:[{
                        model:User,
                        attributes:['id','nickname'],
                    }]
                }, {
                    model:Post,
                    as:'Retweet',
                    include:[{
                        model:Image
                    }, {
                        model:User,
                        attributes:{
                            exclude:['password']
                        }
                    }]
                }]
            });
            res.status(200).json(posts);
        } else {
            return res.status(404).send('존재하지 않은 사용자입니다')
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.followings = async (req,res,next) => {
    try {
        const user = await User.findOne({ 
            where: { id:req.user.id }
        });
        if(!user) {
             return res.status(403).send('존재하지 않는 사람입니다');
        }
        const followings = await user.getFollowings({
            limit: parseInt(req.query.limit, 10),
        });
        return res.status(200).json(followings);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.followers = async (req,res,next) => {
    try {
        const user = await User.findOne({
            where: { id: req.user.id }
        });
        if(!user) {
            return res.status(403).send('존재하지 않는 사람입니다')
        }
        const followers = await user.getFollowers({
            limit:parseInt(req.query.limit, 10)
        });
        return res.status(200).json(followers);
    } catch (err) {
        console.error(err);
        next(err);
    }
}