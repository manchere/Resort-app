const mongoose = require('mongoose');
const crypto = require('crypto');

var userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
	},
	type: {
		type: String,
		required: true
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	location: {
		type: String,
		required: true
	},
    hash: String,
    salt: String
});

// methods for passport
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return this.hash === hash;
}

// methods for jsonwebtoken

module.exports = mongoose.model('User', userSchema);
