var assert = require('assert');
var EngineTypes = require('../models/EngineTypesEnum');
var EngineTypesController = require('../controllers/EngineTypes');

var app = require('../bin/www');
var request = require('supertest')(app);

describe('EngineTypes controller', function() {
	it('Return all engine types with correct key/value pairs', function(done) {

		request.get('/engineTypes')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end(function(err, res) {
				if (err) {
					console.log(err);
				} else {
					assert.equal(res.status, 200);
					assert.equal(res.body.length, 4);
					assert.equal(res.body.includes(EngineTypes.gas), true);
					assert.equal(res.body.includes(EngineTypes.diesel), true);
					assert.equal(res.body.includes(EngineTypes.electric), true);
					assert.equal(res.body.includes(EngineTypes.hybrid), true);
				}
				done();
			});
	})
});