module.exports = async (Video, data) => {
	try {
		const newVideo = new Video({
			_id: new Date().valueOf(),
			url: data,
		});
		await newVideo.save();
		return Object.freeze({
			error: false,
			message: 'Video successfully saved',
			data: newVideo,
		});
	} catch (err) {
		return Object.freeze({
			error: true,
			message: 'Video not saved',
		});
	}
};
