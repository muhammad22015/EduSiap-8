const express = require('express');
const router = express.Router();

const userRoutes = require('./UserRoutes');
const videoRoutes = require('./VideoRoutes');
const storybookRoutes = require('./StorybookRoutes');
const quizRoutes = require('./QuizRoutes')

router.use('/users', userRoutes);
router.use('/videos', videoRoutes);
router.use('/storybook', storybookRoutes);
router.use('/quiz', quizRoutes);

module.exports = router;