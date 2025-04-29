const express = require('express');
const router = express.Router();
const { allData, videobyId } = require('../controllers/VideoController');

router.get('/', allData);
router.get('/watch', videobyId);

module.exports = router;