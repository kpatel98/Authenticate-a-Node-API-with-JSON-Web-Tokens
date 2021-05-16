const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
  	},
	password: {
		type: String,
		required: true,
		trim: true,
  	}
});

module.exports = mongoose.model('User', userSchema);