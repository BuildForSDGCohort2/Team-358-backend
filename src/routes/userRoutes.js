import makeRequest from '../users/helpers/makeRequest.js';
import createUser from '../users/controllers/createUser.js';
import loginUser from '../users/controllers/loginUser.js';

export default (app) => {
	app.post('/user/register', makeRequest(createUser));
	app.post('/user/login', makeRequest(loginUser));
};
