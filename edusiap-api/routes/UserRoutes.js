const express = require('express');
const router = express.Router();
const { register, login, verify } = require('../controllers/UserController');

router.post('/register', register);
router.get('/verify', verify);
router.post('/login', login);

module.exports = router;