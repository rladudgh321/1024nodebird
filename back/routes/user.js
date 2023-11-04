const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middleware');
const { signup, login, logout, changeNicknameEdit, loadMyInfo, loadUserInfo, 
    following, unfollowing, removeFollower, loadUserPosts,
    followings, followers
} = require('../controllers/user');

router.post('/login', isNotLoggedIn, login);
router.patch('/changeNicknameEdit', isLoggedIn, changeNicknameEdit);
router.post('/logout', isLoggedIn, logout);
router.get('/followings', isLoggedIn, followings);
router.get('/followers', isLoggedIn, followers);
router.get('/', loadMyInfo);
router.post('/', isNotLoggedIn, signup);
router.post('/:userId/following', isLoggedIn, following);
router.delete('/:userId/following', isLoggedIn, unfollowing);
router.post('/:userId/removeFollower', isLoggedIn, removeFollower);
router.get('/:userId', loadUserInfo);
router.get('/:userId/posts', loadUserPosts);

module.exports = router;