function homeController(req, res) {
	res.send('Welcome');
}

export default (app) => {
	app.get('/', homeController);
};
