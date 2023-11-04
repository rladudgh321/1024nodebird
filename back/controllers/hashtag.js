const { User, Post, Hashtag, Image, Comment } = require('../models');
const { Op } = require('sequelize');

exports.loadHashtagPosts = async (req,res,next) => { //GET /hashtag/해시태그/posts
    try {
        const where = { };
        if(parseInt(req.query.lastId, 10)) {
            where.id = { [Op.lt] : parseInt(req.query.lastId, 10)  };
        }
        const posts = await Post.findAll({
            where,
            limit:10,
            order:[['createdAt', 'DESC']],
            include:[{
                model:User,
                attributes:{
                    exclude:['password'],
                }
            },{
                model:Hashtag,
                where: { name: decodeURIComponent(req.params.hashtag) }
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
    } catch (err) {
        console.error(err);
        next(err);
    }
};