const express = require('express');
const router = express.Router();
const sendNotification = require('../controllers/sendNotification');
const uploadVideo = require('../controllers/uploadVideo');
const getVideos = require('../controllers/getVideos');

router.post('/user/notification', sendNotification);
router.post('/user/upload', uploadVideo);
router.get('/user/videos', getVideos);

module.exports = router;
