const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const VideoSchema = new Schema(
	{
		_id: {type: Number},
		url: {type: String, required: true},
	},
	{
		timestamps: true,
	}
);

module.exports = Model('Video', VideoSchema);
