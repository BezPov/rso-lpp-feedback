'use strict'

let mysql = require('mysql');

const etcd = require('./etcd');

module.exports = function () {
	etcd.get("feedback_db_credentials", (err, res) => {
		if (err) {
			console.log(err);

			return;
		}

		else {
			let credentials = res.split('||');

			return mysql.createConnection({
				host: credentials[0],
				user: credentials[1],
				password: credentials[2],
				database:credentials[3]
			});
		}
	});
};