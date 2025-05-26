const express = require('express');
const router = express.Router();
const { newAccessToken } = require('../controllers/RefreshTokenController');

router.get('/', newAccessToken);

module.exports = router;