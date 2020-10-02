const User = require('../models/user');

module.exports = async (_id) => {
	try {
		const user = await User.findOne({_id});
		return user;
	} catch (err) {
		return err;
	}
};
