const status = require('http-status-codes');

const errors = {
	UNKNOWN_ERROR: {
		status: status.INTERNAL_SERVER_ERROR,
		message: 'Unknown server error.',
	},

	// User
	USER_NOT_FOUND: {
		status: status.NOT_FOUND,
		message: 'User Not Found',
	},
	USERNAME_AND_PASSWORD_DIDNT_MATCH: {
		status: status.UNAUTHORIZED,
		message: `Username and Password didn't match`,
	},
	GIVEN_USERNAME_IS_ALREADY_EXIST: {
		status: status.NOT_ACCEPTABLE,
		message: `Given Username is already exist`,
	},
};

module.exports = errors;
