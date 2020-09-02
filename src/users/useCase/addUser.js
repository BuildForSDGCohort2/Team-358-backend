import makeAddUser from '../entity/makeAddUser.js';
import validateUserCredentials from '../helpers/validateUserCredentials.js';
import {checkIfUserExists} from '../queries.js';
import encrypt from '../utilities/encrypt.js';
import jwtToken from '../utilities/jwtToken.js';
import mongoose from 'mongoose';

export default async function addUser(ref, data) {
	const {name, email, password} = data;
	let validateParams = validateUserCredentials(data);
	let validateEmail = await checkIfUserExists({ref, email});

	let makeUser = await makeAddUser({validateParams, validateEmail, encrypt, jwtToken}, data);
	if (makeUser.error) {
		return Object.freeze({
			error: makeUser.error,
			message: makeUser.message,
			code: makeUser.code,
			data: makeUser.data,
		});
	} else {
		try {
			const newUser = new ref({
				_id: new mongoose.Types.ObjectId(),
				name: makeUser.data.name,
				email: makeUser.data.email,
				password: makeUser.data.password,
			});
			await newUser.save();
			return Object.freeze({
				error: makeUser.error,
				message: makeUser.message,
				code: makeUser.code,
				data: makeUser.data,
			});
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
