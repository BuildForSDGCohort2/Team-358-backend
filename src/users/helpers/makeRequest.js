export default function makeRequest(controller) {
	return (req, res) => {
		const httpRequest = {
			body: req.body,
			query: req.query,
			params: req.params,
			ip: req.ip,
			method: req.method,
			path: req.path,
			headers: {
				'Content-Type': req.get('Content-Type'),
				Referer: req.get('referer'),
				'User-Agent': req.get('User-Agent'),
				token: req.get('auth-token'),
			},
		};
		controller(httpRequest)
			.then(({headers, status, statusCode, message, data}) => {
				if (headers) {
					res.set(headers);
				}
				res.type('json');
				res.status(statusCode).send({status, message, data});
			})
			.catch((e) => res.status(500).send({message: 'An unkown error occurred.', err: e}));
	};
}
// {
//   headers: { 'Content-Type': 'application/json' },
//   status: 'error',
//   statusCode: 409,
//   message: 'Email already exists',
//   data: ''
// }
