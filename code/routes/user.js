const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

// POST user/create-user
router.post('/create-user', userController.createUser);

// POST user/login-user
router.post('/login-user', userController.loginUser);

// GET user/user-profile
router.get('/user-profile', userController.userProfile);

module.exports = router;