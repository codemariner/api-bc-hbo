'use strict';

const path = require('path');
const redis = require('redis');
const Bluebird = require('bluebird');

module.exports.handler = (event, context, callback) => {
	// todo: client creation and config to lib
	// consider disposer pattern
	// configure retry/timeout logic
	const client = redis.createClient({
		host: 'redis.nkysj7.ng.0001.use1.cache.amazonaws.com'
	});

	Bluebird.promisifyAll(client);

	const response = {
		statusCode: 200,
		body: '{}'
	};

	let err;

	client.hgetallAsync('1').then(val => {
		console.log('val', val);
		response.body = JSON.stringify({message: val + ''});
	})
	.catch(e => {
		response.statusCode = 500;
		response.body = JSON.stringify({message: e.message || e.toString()});
		err = e;
	})
	.finally(() => {
		try {
			client.quit();
		} catch (e) {
		}
		callback(err, response);
	});

};
