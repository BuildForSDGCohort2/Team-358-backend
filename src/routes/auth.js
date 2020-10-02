const express = require('express');
const router = express.Router();
const loginUser = require('../controllers/loginUser');
const createUser = require('../controllers/createUser');
const savePushToken = require('../controllers/savePushToken');

router.post('/user/register', createUser);
router.post('/user/login', loginUser);
router.post('/user/saveToken', savePushToken);

module.exports = router;
