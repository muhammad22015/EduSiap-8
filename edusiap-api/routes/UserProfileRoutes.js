const express = require('express');
const router = express.Router();
const { userProfileByUserId } = require('../controllers/UserProfileController');

router.get('/', userProfileByUserId);

module.exports = router;