const express = require('express');
const router = express.Router();

const userRoutes = require('./UserRoutes');
const videoRoutes = require('./VideoRoutes');

router.use('/users', userRoutes);
router.use('/videos', videoRoutes);

module.exports = router;