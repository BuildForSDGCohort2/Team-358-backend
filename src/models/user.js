const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	_id: mongoose.Types.ObjectId,
	name: {type: String, required: true},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	createdAt: {type: String},
	password: {type: String},
});

module.exports = mongoose.model('User', UserSchema);
