const User = require('../models/user');
const validateUserCredentials = require('../helpers/validateUserCredentials');
const checkExistingUser = require('../queries/checkExistingUser');
const saveUser = require('../helpers/saveUser');
const {hash} = require('../helpers/encrypt');
const {generate} = require('../helpers/jwtToken');

module.exports = async (req, res) => {
	const email = req.body.email.trim();
	const name = req.body.name.trim();
	const password = req.body.password.trim();

	const validateParams = validateUserCredentials({email, name, password});

	if (validateParams.error) {
		return res.status(417).json({status: 'error', message: validateParams.message, data: ''});
	} else {
		const checkIfUser = await checkExistingUser({User, email});
		if (checkIfUser) {
			return res.status(409).json({status: 'error', message: 'Email exists already', data: ''});
		} else {
			try {
				// hash password
				const userPassword = hash(password, 10);
				const addUser = await saveUser({User, data: {email, name, password: userPassword}});
				if (addUser.error) {
					return res.status(500).json({status: 'error', message: addUser.message, data: ''});
				} else {
					const payload = {name, email, id: addUser.data._id};
					const userToken = generate(payload);
					return res.status(201).json({status: 'ok', message: addUser.message, data: {name, email, userToken}});
				}
			} catch (err) {
				console.log(err);
				return res.status(500).json({status: 'error', message: 'Something went wrong!', data: ''});
			}
		}
	}
};
