const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middleware');
const { signup, login, logout, changeNicknameEdit, loadMyInfo, following, unfollowing, removeFollower } = require('../controllers/user');

router.post('/login', isNotLoggedIn, login);
router.patch('/changeNicknameEdit', isLoggedIn, changeNicknameEdit);
router.post('/logout', isLoggedIn, logout);
router.post('/:userId/following', isLoggedIn, following)
router.delete('/:userId/following', isLoggedIn, unfollowing)
router.post('/:userId/removeFollower', isLoggedIn, removeFollower)
router.get('/', loadMyInfo);
router.post('/', isNotLoggedIn, signup);

module.exports = router;