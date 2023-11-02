const { User, Image, Comment, Post } = require('../models');

const { Op } = require('sequelize');

exports.loadPosts = async (req,res,next) => {
    try {
        const where = {};
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
