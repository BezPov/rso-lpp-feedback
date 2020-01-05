'use strict'

const CreditAccount = require('../DB/Schemas/CreditAccount');

module.exports = function(server) {

	/**
	 * Save feedback from user
	 */
	server.post('/feedback/create', (req, res, next) => {
		const data = req.body || {};
	});
};