const regEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export default ({email, name, password}) => {
	let message = '';
	let pass = false;
	if (name.trim() === '') {
		message = 'Name can not be empty';
		pass = false;
	} else if (email.trim() === '') {
		message = 'Email can not be empty';
		pass = false;
	} else if (!email.match(regEx)) {
		message = 'Invalid email address';
		pass = false;
	} else if (password.trim() === '') {
		message = 'Password cannot be empty';
		pass = false;
	} else if (password.trim() < 6) {
		message = 'Password must be greater than 6 characters';
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
