import makeUserLogin from '../entity/makeUserLogin.js';
import encrypt from '../utilities/encrypt.js';
import jwtToken from '../utilities/jwtToken.js';
import validateLoginCredentials from '../helpers/validateLoginCredentials.js';
import {findUserByEmail} from '../queries.js';

export default async function userLogin(options) {
	const {ref, data} = options;
	const {email, password} = data;

	let validateParams = validateLoginCredentials(data);
	const user = await findUserByEmail({ref, email});

	let makeUser = await makeUserLogin({validateParams, encrypt, jwtToken, data}, user);

	if (makeUser.error) {
		return Object.freeze({
			error: makeUser.error,
			message: makeUser.message,
			code: makeUser.code,
			data: makeUser.data,
		});
	} else {
		try {
			return makeUser;
		} catch (error) {
			console.log(error);
			return Object.freeze({
				error: true,
				message: error,
				code: 500,
				data: '',
			});
		}
	}
}
