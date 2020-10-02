const User = require('../models/user');

module.exports = async ({_id, token}) => {
	try {
		let user;
		user = await User.findOne({_id});
		user.pushToken = token;
		// save hospital to datbase
		await user.save();

		return Object.freeze({
			error: false,
			message: 'User successfully updated',
			data: user,
		});
	} catch (err) {
		console.log(err);
		return Object.freeze({
			error: true,
			message: 'User not saved',
		});
	}
};
