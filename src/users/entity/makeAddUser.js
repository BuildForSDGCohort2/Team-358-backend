export default async function makeAddUser({validateParams, validateEmail, encrypt, jwtToken}, userCredentials) {
	if (!validateParams.pass) {
		return Object.freeze({
			error: true,
			message: validateParams.message,
			code: 417,
			data: '',
		});
	}

	if (validateEmail) {
		return Object.freeze({
			error: true,
			message: 'Email already exists',
			code: 409,
			data: '',
		});
	}
	try {
		const name = userCredentials.name;
		const email = userCredentials.email;
		const password = encrypt.hash(userCredentials.password, 10);
		const payload = {name: name, email: email};
		let userToken = jwtToken.generate(payload);

		return Object.freeze({
			error: false,
			message: 'User created successfully',
			code: 201,
			data: {
				name,
				email,
				password,
				userToken,
			},
		});
	} catch (error) {
		console.log(error);
		return `An error occured -> ${error}`;
	}
}
