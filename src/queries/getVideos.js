module.exports = async (Video) => {
	try {
		const videos = await Video.find();
		return videos;
	} catch (err) {
		return err;
	}
};
