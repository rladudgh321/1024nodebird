const { Post, User, Image, Comment } = require('../models');

exports.loadPosts = async (req,res,next) => {
    const posts = await Post.findAll({
    });
    res.json(posts);
};

exports.uploadImage = (req,res) => {
    console.log('req.files', req.files);
    res.status(200).json(req.files.map((v) => v.filename ));
}

exports.addPost = async (req, res, next) => {
    try {
        const hashtags = req.body.content.match(/(#[^\s#]+)/g);
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if(hashtags) {
            const result = await Promise.all(hashtags.map((tag) => hashtags.findOrCreate({
                where: { name: tag.slice(1).toLowerCase() },
            }) ));
            await post.addHashtags(result.map((v) => v[0]));
        }
        const fullPost = await Post.findOne({
            where: { id:post.id },
            include:[{
                model:User,
                attributes:['id','nickname'],
            }, {
                model:User,
                as:'Likers',
                attributes:['id','nickname']
            }, {
                model:Post,
                as:'Retweet',
            }, {
                model:Image
            }, {
                model:Comment,
                include:[{
                    model:User,
                    attributes:['id', 'nickname']
                }]
            }],
        });
        res.status(201).json(fullPost);
    } catch (err) {
        console.error(err);
        next(err);
    }
}