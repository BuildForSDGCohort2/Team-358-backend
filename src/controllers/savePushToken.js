const updateUser = require('../queries/updateUser');
const getUserById = require('../queries/getUserById');

module.exports = async (req, res) => {
	const _id = req.body.id;
	const token = req.body.token;
	const getUser = await getUserById(_id);
	if (!getUser) {
		return res.status(409).json({status: 'error', message: 'User not found', data: ''});
	} else {
		const data = await updateUser({_id, token});
		return res.status(200).json({status: 'ok', message: 'Token Saved', data});
	}
};
