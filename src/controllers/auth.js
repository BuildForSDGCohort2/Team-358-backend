const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
	const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

	if (req.body.email.match(re)) {
		User.find({email: req.body.email})
			.exec()
			.then((user) => {
				if (user.length > 0) {
					return res.status(409).json({messag: 'Email taken already'});
				} else {
					bcrypt.hash(req.body.password, 10, function (err, hash) {
						if (hash) {
							const user = new User({
								_id: new mongoose.Types.ObjectId(),
								name: req.body.name,
								email: req.body.email,
								createdAt: new Date().toISOString(),
								password: hash,
							});
							user.save()
								.then(() => {
									res.status(200).json({message: 'User registered successfully'});
								})
								.catch((err) => {
									return res.status(500).json({message: 'Something went wrong'});
								});
						} else {
							return res.status(500).json({message: 'Something went wrong'});
						}
					});
				}
			})
			.catch((err) => {
				console.log(err);
				return res.status(500).json({message: 'Something went wrong'});
			});
	} else {
		return res.status(409).json({message: 'Invalid email address'});
	}
};

exports.login = (req, res, next) => {
	User.find({email: req.body.email})
		.exec()
		.then((user) => {
			if (user.length < 1) {
				res.status(401).json({message: 'Wrong credentials! Please, try again.'});
			} else {
				bcrypt.compare(req.body.password, user[0].password, (err, response) => {
					if (err) {
						res.status(401).json({message: 'Wrong credentials! Please, try again.'});
					}
					if (response) {
						const token = jwt.sign(
							{email: user[0].email, userId: user[0]._id, username: user[0].username},
							process.env.MONGO_ATLAS_PW,
							{
								expiresIn: '2h',
							}
						);
						return res.status(200).json({message: 'Logged In', token});
					}
					res.status(401).json({message: 'Wrong credentials! Please, try again.'});
				});
			}
		})
		.catch((err) => {
			return res.status(500).json({message: 'Something went wrong'});
		});
};
