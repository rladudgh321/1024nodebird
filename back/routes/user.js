const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middleware');
const { signup, login, logout } = require('../controllers/user');

router.post('/login', isNotLoggedIn, login);
router.post('/logout', isLoggedIn, logout);
router.post('/', isNotLoggedIn, signup);

module.exports = router;