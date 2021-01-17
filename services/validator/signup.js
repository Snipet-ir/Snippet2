const status = require('http-status-codes');
const config = require('../../config');
const joi = require('joi');

function signup(req, res, next) {
	const signupSchema = joi.object().keys({
		username: joi
			.string()
			.regex(/^\w+$/, 'Username should only contain Letters, Numbers and Underscores')
			.min(config.validator.username.minLength)
			.max(config.validator.username.maxLength)
			.required(),

		password: joi.string().min(config.validator.password.minLength).required(),
	});

	const { error } = signupSchema.validate(req.body, config.joi.options);
	if (error) {
		return res.status(status.BAD_REQUEST).json({ message: error.message });
	}
	return next();
}

module.exports = signup;
