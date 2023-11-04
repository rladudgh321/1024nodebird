const express = require('express');
const router = express.Router();
const multer = require('multer');
const { isLoggedIn, isNotLoggedIn } = require('../middleware');
const { uploadImage, addPost, likePost, unlikePost, 
    addComment, retweet, removePost, loadPost } = require('../controllers/post');
const fs = require('fs');
const path = require('path');

try {
    fs.accessSync('uploads')
} catch (err) {
    console.error('uploads 폴더가 없으므로 uploads폴더를 생성하겠습니다');
    fs.mkdirSync('uploads');
}


const uploads = multer({
    storage:multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            done(null, basename + new Date().getTime() + ext);
        }
    }),
    limits: { fieldSize: 20 * 1024 * 1024 }
})

router.post('/image', isLoggedIn, uploads.array('images') ,uploadImage);
router.post('/addPost', isLoggedIn, addPost);
router.post('/:postId/addComment', isLoggedIn, addComment);
router.post('/:postId/retweet', isLoggedIn, retweet );
router.patch('/:postId/like', isLoggedIn, likePost);
router.delete('/:postId/like', isLoggedIn, unlikePost);
router.delete('/:postId/removePost', isLoggedIn, removePost);
router.get('/:postId', loadPost);

module.exports = router;