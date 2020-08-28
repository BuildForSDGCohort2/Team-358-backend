const jwt = require('jsonwebtoken');
const {salt} = require('../utils/config');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.MONGO_ATLAS_PW);
		req.userData = decodedToken;
		next();
	} catch (error) {
		return res.status(401).json({message: 'Authentication failed'});
	}
};
