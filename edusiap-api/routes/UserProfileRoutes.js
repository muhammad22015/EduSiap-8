const express = require('express');
const router = express.Router();
const { userProfileByUserId, updateUserProfileByUserId } = require('../controllers/UserProfileController');

router.get('/', userProfileByUserId);
router.put('/update', updateUserProfileByUserId);

module.exports = router;