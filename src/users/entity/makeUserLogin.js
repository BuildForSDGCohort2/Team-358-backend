export default async function makeLoginUser({validateParams, encrypt, jwtToken, data}, user) {
	if (!validateParams.pass) {
		return Object.freeze({
			error: true,
			message: validateParams.message,
			code: 400,
			data: '',
		});
	}
	if (!user) {
		return Object.freeze({
			error: true,
			message: 'Email or password incorrect',
			code: 400,
			data: '',
		});
	}

	try {
		const {name, email, password, _id} = user;
		const hashedPwd = password;
		const plainPwd = data.password;
		const passwordIsMatch = encrypt.validate(plainPwd, hashedPwd);

		if (!passwordIsMatch) {
			return Object.freeze({
				error: true,
				message: 'Email or password incorrect',
				code: 400,
				data: '',
			});
		}

		const payload = {id: _id, email: email};
		let userToken = jwtToken.generate(payload);

		return Object.freeze({
			error: false,
			message: 'User logged in successfully',
			code: 201,
			data: {
				name,
				email,
				_id,
				userToken,
			},
		});
	} catch (error) {
		console.log(error);
		return errror;
	}
}
