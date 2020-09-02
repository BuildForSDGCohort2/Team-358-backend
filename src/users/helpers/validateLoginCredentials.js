const regEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export default ({email, password}) => {
	let message = '';
	let pass = false;
	if (email.trim() === '') {
		message = 'Email can not be empty';
		pass = false;
	} else if (!email.match(regEx)) {
		message = 'Invalid email address';
		pass = false;
	} else if (password.trim() === '') {
		message = 'Password cannot be empty';
		pass = false;
	} else {
		message = '';
		pass = true;
	}

	return Object.freeze({
		pass,
		message,
	});
};
