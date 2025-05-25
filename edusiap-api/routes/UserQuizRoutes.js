const express = require('express');
const router = express.Router();
const { scoreById, uploadScoreById } = require('../controllers/UserQuizController');

router.get('/', scoreById);
router.post('/upload', uploadScoreById);

module.exports = router;