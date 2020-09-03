import adduser from '../useCase/addUser.js';
import {User} from '../../config/index.js';

export default async function createUser(httpRequest) {
	const headers = {
		'Content-Type': 'application/json',
	};

	try {
		let bodyData = httpRequest.body;
		let registeredUser = await adduser(User, bodyData);

		return {
			headers,
			status: registeredUser.error ? 'error' : 'ok',
			statusCode: registeredUser.code,
			message: registeredUser.message,
			data: registeredUser.data,
		};
	} catch (e) {
		return {
			headers,
			status: 'error',
			statusCode: 500,
			message: 'Something went wrong',
			data: '',
		};
	}
}
