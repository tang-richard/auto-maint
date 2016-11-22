var assert = require('assert');
var CarsValidator = require('../controllers/CarsValidator');
var EngineTypes = require('../models/EngineTypesEnum');
var MaintTasks = require('../models/MaintTasks');

describe('Validating if car properties are present in object', function() {
	it('object with no properties should set status message', function() {
		var status = [];
		var testCarWithNoProperties = {};
		CarsValidator.validateCarProperties(status, {});

		assert.equal(status.length, 1);
		assert.equal(status[0], "Missing car properties: make, model, year, odometer, engineType, and maintTasks");
	});

	it('car without "make" property should add missing make to status message', function() {
		var status = [];
		var testCar = {"model":"CX","year":"1989","odometer":"299","engineType":"gas","maintTasks":[]};
		CarsValidator.validateCarProperties(status, testCar);

		assert.equal(status.length, 1);

		var statusContains = status[0].includes("make");
		assert.equal(statusContains, true, "status message should include make");
	});

	it('car without "model" property should add missing model to status message', function() {
		var status = [];
		var testCar = {"make":"Mazda","year":"1989","odometer":"299","engineType":"gas","maintTasks":[]};
		CarsValidator.validateCarProperties(status, testCar);

		assert.equal(status.length, 1);

		var statusContains = status[0].includes("model");
		assert.equal(statusContains, true, "status message should include model");
	});

	it('car without "year" property should add missing year to status message', function() {
		var status = [];
		var testCar = {"make":"Mazda","odometer":"299","engineType":"gas","maintTasks":[]};
		CarsValidator.validateCarProperties(status, testCar);

		assert.equal(status.length, 1);

		var statusContains = status[0].includes("year");
		assert.equal(statusContains, true, "status message should include year");
	});

	it('car without "odometer" property should add missing odometer to status message', function() {
		var status = [];
		var testCar = {"make":"Mazda","engineType":"gas","maintTasks":[]};
		CarsValidator.validateCarProperties(status, testCar);

		assert.equal(status.length, 1);

		var statusContains = status[0].includes("odometer");
		assert.equal(statusContains, true, "status message should include odometer");
	});

	it('car without "engineType" property should add missing engineType to status message', function() {
		var status = [];
		var testCar = {"make":"Mazda","odometer":"299","maintTasks":[]};
		CarsValidator.validateCarProperties(status, testCar);

		assert.equal(status.length, 1);

		var statusContains = status[0].includes("engineType");
		assert.equal(statusContains, true, "status message should include engineType");
	});

	it('car without "maintTasks" property should add missing maintTasks to status message', function() {
		var status = [];
		var testCar = {"make":"Mazda","odometer":"299","engineType":"gas"};
		CarsValidator.validateCarProperties(status, testCar);

		assert.equal(status.length, 1);

		var statusContains = status[0].includes("maintTasks");
		assert.equal(statusContains, true, "status message should include maintTasks");
	});
});

describe('Validating make and model properties', function() {
	it('Make property must contain text', function() {
		var status = [];
		var testCar = {"make":"", "model":"CX-5"};
		CarsValidator.validateMakeAndModels(status, testCar);

		assert.equal(status.length, 1);
		assert.equal(status[0], "Car make is required");
	});
	it('Model property must contain text', function() {
		var status = [];
		var testCar = {"make":"Honda", "model":""};
		CarsValidator.validateMakeAndModels(status, testCar);

		assert.equal(status.length, 1);
		assert.equal(status[0], "Car model is required");
	});
	it('Missing both Make and model text should set two status messages', function() {
		var status = [];
		var testCar = {"make":"", "model":""};
		CarsValidator.validateMakeAndModels(status, testCar);

		assert.equal(status.length, 2);
	});
	it('Make and model text will set no messages', function() {
		var status = [];
		var testCar = {"make":"Mazda", "model":"CX-5"};
		CarsValidator.validateMakeAndModels(status, testCar);

		assert.equal(status.length, 0);
	});
});

describe('Validating year and odometer', function() {
	it('Non-numeric year should set status message', function() {
		var status = [];
		var testCar = {"year":"Nineteen Eighty-Four", "odometer":"12345"};
		CarsValidator.validateYearAndOdometer(status, testCar);

		assert.equal(status.length, 1);
		assert.equal(status[0], "Car year must be a non-negative number");
	});

	it('Negative number for year should set message', function() {
		var status = [];
		var testCar = {"year":"-3499", "odometer":"12345"};
		CarsValidator.validateYearAndOdometer(status, testCar);

		assert.equal(status.length, 1);
		assert.equal(status[0], "Car year must be a non-negative number");
	});

	it('Actual number for year should be fine', function() {
		var status = [];
		var testCar = {"year":"2004", "odometer":"12345"};
		CarsValidator.validateYearAndOdometer(status, testCar);

		assert.equal(status.length, 0);
	});

	it('Non-numeric odometer should set status message', function() {
		var status = [];
		var testCar = {"year":"2004", "odometer":"Nine thousand"};
		CarsValidator.validateYearAndOdometer(status, testCar);

		assert.equal(status.length, 1);
		assert.equal(status[0], "Car odometer reading must be a non-negative number");
	});

	it('Negative number for odometer should set message', function() {
		var status = [];
		var testCar = {"year":"2004", "odometer":"-9000"};
		CarsValidator.validateYearAndOdometer(status, testCar);

		assert.equal(status.length, 1);
		assert.equal(status[0], "Car odometer reading must be a non-negative number");
	});

	it('Actual number for odometer should be fine', function() {
		var status = [];
		var testCar = {"year":"2004", "odometer":"9000"};
		CarsValidator.validateYearAndOdometer(status, testCar);

		assert.equal(status.length, 0);
	});
});

describe('Validating engine type', function() {

	it('Empty engine type sets status message', function() {
		var status = [];
		var testCar = {"engineType":""};

		CarsValidator.validateEngineType(status, testCar);
		assert.equal(status.length, 1);
		assert.equal(status[0], "Car engine type is invalid");
	});

	it('Non-existent engine type sets status message', function() {
		var status = [];
		var testCar = {"engineType":"hydrogen"};

		CarsValidator.validateEngineType(status, testCar);
		assert.equal(status.length, 1);
		assert.equal(status[0], "Car engine type is invalid");
	});

	it('All four valid engine types do not set status message', function() {
		Object.keys(EngineTypes).forEach(function(key, index) {
			var status = [];
			var testCar = {"engineType":key};

			CarsValidator.validateEngineType(status, testCar);
			assert.equal(status.length, 0);
		});
	});

	it('All four valid engine types do not set status message regardless of case', function() {
		Object.keys(EngineTypes).forEach(function(key, index) {

			// testing all caps
			var status = [];
			var testCar = {"engineType":key.toUpperCase()};

			CarsValidator.validateEngineType(status, testCar);
			assert.equal(status.length, 0);

			// testing first character uppercase
			status = [];
			var testCar = {"engineType":key.charAt(0).toUpperCase() + key.slice(1)};

			CarsValidator.validateEngineType(status, testCar);
			assert.equal(status.length, 0);
		});
	});
});

describe('Validating maintenance tasks', function() {
	it('Maint tasks invalid w/electric should set correct number of messages', function() {
		var tasksInvalidForElectric = MaintTasks.filter(function(task) {
			return task.invalidWith.includes('electric');
		});

		var testingCarTasks = [];
		tasksInvalidForElectric.forEach(function(task) {
			testingCarTasks.push(task.name);
		});

		var status = [];
		var testCar = {"maintTasks":testingCarTasks, "engineType":"electric"};
		CarsValidator.validateMaintTasks(status, testCar);
		assert.equal(status.length, testingCarTasks.length);
	});
	it('Maint tasks invalid w/diesel should set correct number of messages', function() {
		var tasksInvalidForDiesel = MaintTasks.filter(function(task) {
			return task.invalidWith.includes('diesel');
		});

		var testingCarTasks = [];
		tasksInvalidForDiesel.forEach(function(task) {
			testingCarTasks.push(task.name);
		});

		var status = [];
		var testCar = {"maintTasks":testingCarTasks, "engineType":"diesel"};
		CarsValidator.validateMaintTasks(status, testCar);
		assert.equal(status.length, testingCarTasks.length);
	});
	it('Maint tasks invalid w/hybrid should set correct number of messages', function() {
		var tasksInvalidForHybrid = MaintTasks.filter(function(task) {
			return task.invalidWith.includes('hybrid');
		});

		var testingCarTasks = [];
		tasksInvalidForHybrid.forEach(function(task) {
			testingCarTasks.push(task.name);
		});

		var status = [];
		var testCar = {"maintTasks":testingCarTasks, "engineType":"hybrid"};
		CarsValidator.validateMaintTasks(status, testCar);
		assert.equal(status.length, testingCarTasks.length);
	});
	it('Invalid maintenance tasks should not be allowed', function() {
		var status = [];
		var testCar = {"maintTasks":['Invalid Maint Task'], "engineType":"hybrid"};
		CarsValidator.validateMaintTasks(status, testCar);
		assert.equal(status.length, 1);
		assert.equal(status[0].includes('Invalid Maint Task'), true);
	});
});