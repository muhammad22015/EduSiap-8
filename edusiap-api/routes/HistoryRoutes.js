const express = require('express');
const router = express.Router();
const { historyByUserId, watchVideo } = require('../controllers/HistoryController');

router.get('/', historyByUserId);
router.post('/watched', watchVideo);

module.exports = router;