const config = require('../../config');
const jwt = require('../../services/jwt');
const { users } = require('../../db');
const argon = require('../../services/argon2');
const validator = require('../../services/validator');
const error = require('../../services/errors');

async function login(req, res, next) {
	try {
		const { username, password } = req.body;

		let foundUser = await users.findUserByUsername(username);
		if (!foundUser) {
			throw error.USER_NOT_FOUND;
		}

		const checkPassword = await argon.verify(foundUser.password, password);
		if (!checkPassword) {
			throw error.USERNAME_AND_PASSWORD_DIDNT_MATCH;
		}

		const token = jwt.getToken({ id: foundUser._id, username });
		return res.json({ token, username: foundUser.username });
	} catch (err) {
		next(err);
	}
}

async function signup(req, res, next) {
	try {
		const { username, password } = req.body;

		// validate inputs
		validator.username(username);
		validator.password(password);

		let foundUser = await users.findUserByUsername(username);
		if (foundUser) {
			if (await argon.verify(foundUser.password, password)) {
				const token = jwt.getToken({ id: foundUser._id, username });
				return res.json({ success: true, token, username: foundUser.username });
			} else {
				throw Error(`Given Username is already exist`);
			}
		} else {
			// create a user
			let createdUser = await users.createUser(username, password);
			const token = jwt.getToken({ id: createdUser._id, username });
			return res.json({ success: true, token, username: createdUser.username });
		}
	} catch (err) {
		next(err);
	}
}

module.exports = {
	login,
	signup,
};
