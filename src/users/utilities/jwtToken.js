import jwt from 'jsonwebtoken';
export default {
	generate: (payload) => {
		let token = jwt.sign(
			{
				exp: Math.floor(Date.now() / 1000) + 60 * 60,
				payload,
			},
			process.env.TOKEN_SECRET
		);

		return token;
	},

	backdate: (payload) => {
		let token = jwt.sign(
			{
				payload,
				iat: Math.floor(Date.now() / 1000) - 30,
			},
			process.env.TOKEN_SECRET
		);

		return token;
	},

	verify: (token) => {
		try {
			var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
			return decoded;
		} catch (err) {
			throw new Error(err);
		}
	},
};
