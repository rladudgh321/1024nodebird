const express = require('express');
const router = express.Router();

const { loadPosts } = require('../controllers/posts');

router.get('/', loadPosts);

module.exports = router;