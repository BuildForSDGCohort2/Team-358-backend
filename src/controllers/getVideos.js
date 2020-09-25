const Video = require('../models/videos');
const getVideos = require('../queries/getVideos');

module.exports = async (req, res) => {
	const videos = await getVideos(Video);
	return res.status(200).json({status: 'ok', message: '', data: videos});
};
