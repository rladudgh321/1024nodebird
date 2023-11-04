const express = require('express');
const router = express.Router();
const { loadHashtagPosts } = require('../controllers/hashtag');

router.get('/:hashtag', loadHashtagPosts);

module.exports = router;