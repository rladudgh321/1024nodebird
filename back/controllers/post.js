const { Post, User, Image, Comment, Hashtag } = require('../models');
const { Op } = require('sequelize');

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
        //imagePath
        if(req.body.image) {
            if(Array.isArray(req.body.image)){
                const images = await Promise.all(req.body.image.map((v) => ( Image.create({ src: v }) )));
                await post.addImages(images);
            } else {
                const image = await Image({ src: req.body.image });
                await post.addImages(image);
            }
        }
        if(hashtags) {
            const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
                where: { name: tag.slice(1).toLowerCase() },
            }) ));
            await post.addHashtags(result.map((v) => v[0]));
        }
        const fullPost = await Post.findOne({
            where: { id:post.id },
            order: [['createdAt', 'DESC']],
            include:[{
                model:User,
                attributes:['id','nickname'],
            },{
                model:Image
            }, {
                model:User,
                as:'Likers',
                attributes:['id'],
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

exports.likePost = async (req,res,next) => {
    try {
        if(!req.user) {
            return res.status(403).send('로그인 후 이용하실 수 있습니다');
        }
        const post = await Post.findOne({
            where: { id: parseInt(req.params.postId, 10) }
        });
        if(!post) {
            return res.status(404).send('게시글을 찾을 수 없습니다');
        }
        await post.addLikers(req.user.id);
        return res.status(201).json({ UserId: req.user.id, PostId: post.id });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.unlikePost = async (req,res,next) => {
    try {
        if(!req.user) {
            return res.status(403).send('로그인 후 이용하실 수 있습니다');
        }
        const post = await Post.findOne({
            where: { id: parseInt(req.params.postId, 10) }
        });
        if(!post) {
            return res.status(404).send('게시글을 찾을 수 없습니다');
        }
        await post.removeLikers(req.user.id);
        return res.status(201).json({ UserId: req.user.id, PostId: post.id });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.addComment = async (req,res,next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.body.PostId }
        });
        if(!post) {
            return res.status(403).send('게시글이 존재하지 않습니다');
        }
        const comment = await Comment.create({
            content:req.body.content,
            UserId:req.body.UserId,
            PostId:req.body.PostId,
        });
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include:[{
                model:User,
                attributes:['id','nickname'],
            }]
        });
        return res.status(201).json(fullComment);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.retweet = async (req,res,next) => {
    const post = await Post.findOne({
        where: { id: parseInt(req.params.postId, 10) },
        include:[{
            model:Post,
            as:'Retweet',
        }]
    });
    if(!post) {
        return res.status(403).send('존재하지 않은 게시글입니다');
    }
    if(req.user.id === post.UserId && (post.Retweet && post.Retweet.UserId === req.user.id)  ) {
        return res.status(403).send('자신의 글을 리트윗 할 수 없습니다');
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
        where: { 
            RetweetId: retweetTargetId,
            UserId:req.user.id,
        }
    });
    if(exPost) {
        return res.status(403).send('이미 리트윗했습니다');
    }
    const retweet = await Post.create({
        content:'retweet',
        PostId:parseInt(req.params.postId, 10),
        UserId:req.user.id,
        RetweetId:retweetTargetId,
    });
    const fullRetweetPost = await Post.findOne({
        where: { id:retweet.id },
        include:[{
            model:Post,
            as:'Retweet',
            include:[{
                model:Image
            }, {
                model:User,
                attributes:{
                    exclude:['password'],
                }
            }]
        }, {
            model:User,
            attributes:{
                exclude:['password']
            }
        }, {
            model:Comment,
            include:[{
                model:User,
                attributes:['id','nickname']
            }]
        }, {
            model:User,
            as:'Likers',
            attributes:['id'],
        }, {
            model:Image
        }]
    });
    return res.status(201).json(fullRetweetPost);
}


exports.removePost = async (req,res,next) => {
    try {
        const post = await Post.findOne({
            where: { id: parseInt(req.params.postId, 10) }
        });
        if(!post) {
            return res.status(403).send('존재하지 않은 게시글입니다');
        }
        await Post.destroy({
            where: { id: parseInt(req.params.postId, 10) }
        });
        return res.status(200).json(parseInt(req.params.postId, 10));
    } catch (err) {
        console.error(err);
        next(err);
    }
}


exports.loadPost = async (req,res,next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId }
        });
        if(!post) {
            return res.status(404).send('존재하지 않은 게시글입니다');
        }
        const fullPost = await Post.findOne({
            where: { id: post.id },
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
        res.status(200).json(fullPost);
    } catch (err) {
        console.error(err);
        next(err);
    }
};