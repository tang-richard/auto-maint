var assert = require('assert');
var EngineTypes = require('../models/MaintTasks');
var EngineTypesController = require('../controllers/MaintTasks');

var app = require('../bin/www');
var request = require('supertest')(app);

describe('Maintenance Tasks controller', function() {
	it('Return all maintenance tasks', function(done) {

		request.get('/maintTasks')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end(function(err, res) {
				if (err) {
					console.log(err);
				} else {
					assert.equal(res.status, 200);
					assert.equal(res.body.length, 9);

					var maintTasks = res.body;
					maintTasks.forEach(function(task) {
						assert.equal(task.hasOwnProperty('name'), true);
						assert.equal(task.hasOwnProperty('description'), true);
						assert.equal(task.hasOwnProperty('invalidWith'), true);
					});
				}
				done();
			});
	})

	it('Correctly search and return maintenance task, given task name, in either cases', function() {
		var result = EngineTypesController.getTask('ReplaceSparkPlugs');
		assert.equal(result.hasOwnProperty('name'), true);
		assert.equal(result.hasOwnProperty('description'), true);
		assert.equal(result.hasOwnProperty('invalidWith'), true);
		assert.equal(result.name, 'ReplaceSparkPlugs');

		result = EngineTypesController.getTask('replacefuelfilter');
		assert.equal(result.hasOwnProperty('name'), true);
		assert.equal(result.hasOwnProperty('description'), true);
		assert.equal(result.hasOwnProperty('invalidWith'), true);
		assert.equal(result.name.toLowerCase(), 'ReplaceFuelFilter'.toLowerCase());

		result = EngineTypesController.getTask('REFILLBRAKEFLUID');
		assert.equal(result.hasOwnProperty('name'), true);
		assert.equal(result.hasOwnProperty('description'), true);
		assert.equal(result.hasOwnProperty('invalidWith'), true);
		assert.equal(result.name.toLowerCase(), 'RefillBrakeFluid'.toLowerCase());
	});

	it('Invalid maintenance tasks return an empty object', function() {
		var result = EngineTypesController.getTask('NotaMaintTask');
		assert.equal(result.hasOwnProperty('name'), false);
		assert.equal(result.hasOwnProperty('description'), false);
		assert.equal(result.hasOwnProperty('invalidWith'), false);
	});

	it('Duplicate maintenance task entries are removed and reassigned to Car', function() {
		var car = {
			"make": "Mazda",
			"model":"CX",
			"year":"1989",
			"odometer":"299",
			"engineType":"gas",
			"maintTasks":[
				'ReplaceOilFilter',
				'ReplaceOilFilter',
				'ReplaceOilFilter',
				'ReplaceOilFilter',
				'ReplaceSparkPlugs',
				'ReplaceSparkPlugs',
				'TuneEngine'
			]};
		EngineTypesController.removeDuplicateMaintTasks(car);
		assert.equal(car.maintTasks.length, 3);
		assert.equal(car.maintTasks[0], 'ReplaceOilFilter');
		assert.equal(car.maintTasks[1], 'ReplaceSparkPlugs');
		assert.equal(car.maintTasks[2], 'TuneEngine');
	});
});