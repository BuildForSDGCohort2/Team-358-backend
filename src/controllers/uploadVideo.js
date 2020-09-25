const Video = require('../models/videos');
const saveVideo = require('../helpers/saveVideo');

module.exports = async (req, res) => {
	const url = req.body.url;
	if (url.trim() === '') {
		return res.status(417).json({status: 'error', message: 'No URL', data: ''});
	} else {
		const save = await saveVideo(Video, url);
		if (save.error) {
			return res.status(417).json({status: 'error', message: 'Error saving video location', data: ''});
		} else {
			return res.status(200).json({status: 'ok', message: 'Video saved', data: url});
		}
	}
};
