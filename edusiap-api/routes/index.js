const express = require('express');
const router = express.Router();

const userRoutes = require('./UserRoutes');
const videoRoutes = require('./VideoRoutes');
const storybookRoutes = require('./StorybookRoutes');
const quizRoutes = require('./QuizRoutes');
const historyRoutes = require('./HistoryRoutes');
const userProfileRoutes = require('./UserProfileRoutes')
const playlistRoutes = require('./PlaylistRoutes');
const playlistVideosRoutes = require('./PlaylistVideosRoutes');

router.use('/users', userRoutes);
router.use('/videos', videoRoutes);
router.use('/storybook', storybookRoutes);
router.use('/quiz', quizRoutes);
router.use('/history', historyRoutes);
router.use('/user-profile', userProfileRoutes);
router.use('/playlists', playlistRoutes);
router.use('/playlists-videos', playlistVideosRoutes);

module.exports = router;