const { snippets } = require('../../db');
const { StatusCodes } = require('http-status-codes');

async function getSnippets(req, res, next) {
	try {
		let userID = req.user._id;
		let { q, public } = req.query;
		let ret =
			public == 'true' ? await snippets.getPublicSnipets(userID, q) : await snippets.getUsersSnipets(userID, q);

		res.success(ret);
	} catch (err) {
		console.error(err);
		next(err);
	}
}

async function createSnippets(req, res, next) {
	try {
		let createRes = await snippets.upsertSnippet(req.user._id, req.body);
		res.status(StatusCodes.CREATED).success(createRes);
	} catch (err) {
		console.error(err);
		next(err);
	}
}

async function deleteSnippets(req, res, next) {
	try {
		let userID = req.user._id;
		let { id } = req.body;
		let ret = await snippets.deleteSnippet(userID, id);
		res.status(StatusCodes.NO_CONTENT).success(ret);
	} catch (err) {
		console.error(err);
		next(err);
	}
}

module.exports = {
	getSnippets,
	createSnippets,
	deleteSnippets,
};
