import userLogin from '../useCase/userLogin.js';
import {User} from '../../config/index.js';

export default async function loginUser(httpRequest) {
	const headers = {
		'Content-Type': 'application/json',
	};

	try {
		let bodyData = httpRequest.body;
		let loginOptions = {
			ref: User,
			data: bodyData,
		};
		let loggedInUser = await userLogin(loginOptions);

		return {
			headers,
			status: loggedInUser.error ? 'error' : 'ok',
			statusCode: loggedInUser.code,
			message: loggedInUser.message,
			data: loggedInUser.data,
		};
	} catch (e) {
		// TODO: Error logging
		console.log(e);
		return {
			headers,
			status: 'error',
			statusCode: 500,
			message: 'Something went wrong',
			data: '',
		};
	}
}
