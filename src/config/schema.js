import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Model = mongoose.model;

const UserSchema = new Schema(
	{
		_id: mongoose.Types.ObjectId,
		name: {type: String, required: true},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {type: String},
	},
	{
		timestamps: true,
	}
);

const User = Model('User', UserSchema);

export {User};
