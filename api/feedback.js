'use strict'

const config = require('../services/database');
let connection = config.get;

module.exports = function(server) {

	/**
	 * Save feedback from user
	 */
	server.post('/feedback/create', (req, res, next) => {
		const data = req.body || {};

		if (!data) {
			res.send(500, { 'message': 'Unable to post feedback. Missing required data.' });
		}

		data.createdAt = new Date();
		data.lastUpdatedAt = new Date();

		connection.query(`INSERT INTO feedbacks SET ?`, data, function (error, results, fields) {
			if (error) {
				res.send(500, {'message': 'Unable to post feedback!'});
			}
			else {
				res.send(200, {'message': 'Feedback posted successfully!'});
				next()
			}
		});
	});
};