'use strict'

let mysql = require('mysql');

//TODO: get this from etcd
module.exports = {
	get: mysql.createConnection({
		host: 'lpp-feedback-server.mysql.database.azure.com',
		user: 'bp@lpp-feedback-server',
		password: 'bezopovi123!',
		database: 'lpp-feedback'
	})
};