var EngineTypes = require('../models/EngineTypesEnum');
var MaintTasksController = require('./MaintTasks');
var MaintTasks = require('../models/MaintTasks');
var s = require("underscore.string");

function validateCar(car) {
	var status = [];

	// check if all properties present in object
	validateCarProperties(status, car);
	
	// // check if make and model are non-empty
	validateMakeAndModels(status, car);

	// // check if year and odometer are non-negative whole numbers
	validateYearAndOdometer(status, car);

	// // check if engine type is one of the available types
	validateEngineType(status, car);

	// // check if maint tasks are allowed for the engine type
	validateMaintTasks(status, car);

	return status;
}

function validateCarProperties(status, car) {
	var missingProperties = [];

	if (!car.hasOwnProperty('make')) {
		missingProperties.push('make');
	}
	if (!car.hasOwnProperty('model')) {
		missingProperties.push('model');
	}
	if (!car.hasOwnProperty('year')) {
		missingProperties.push('year');
	}
	if (!car.hasOwnProperty('odometer')) {
		missingProperties.push('odometer');
	}
	if (!car.hasOwnProperty('engineType')) {
		missingProperties.push('engineType');
	}
	if (!car.hasOwnProperty('maintTasks')) {
		missingProperties.push('maintTasks');
	}
	if (missingProperties.length > 0) {
		var properties = s.toSentenceSerial(missingProperties);
		status.push('Missing car properties: ' + properties);
	}
}

function validateMakeAndModels(status, car) {
	if (car.hasOwnProperty('make') && car.hasOwnProperty('model')) {
		var carMake = car.make.trim();
		var carModel = car.model.trim();

		if (carMake == '') {
			status.push('Car make is required');
		}
		if (carModel == '') {
			status.push('Car model is required');
		}
	}
}

function validateYearAndOdometer(status, car) {
	if (car.hasOwnProperty('year') && car.hasOwnProperty('odometer')) {
		var year = Number(car.year);
		var odometer = Number(car.odometer);

		if (isNaN(year) || year < 0) {
			status.push('Car year must be a non-negative number');
		} 

		if (isNaN(odometer) || odometer < 0) {
			status.push('Car odometer reading must be a non-negative number');
		} 
	}
}

function validateEngineType(status, car) {
	if (car.hasOwnProperty('engineType')) {
		var engine = car.engineType.toLowerCase();
		var engines = [];
		Object.keys(EngineTypes).forEach(function(key, index) {
			engines.push(key);
		});

		if (engines.indexOf(engine) == -1) {
			status.push('Car engine type is invalid');
		}
	}
}

function validateMaintTasks(status, car) {
	if (car.hasOwnProperty('maintTasks') && car.hasOwnProperty('engineType')) {
		var tasks = car.maintTasks;
		var engine = car.engineType.toLowerCase();

		// iterate through the car's maintTypes and look at their invalidWith list
		// if the list contains engine, then the task does not belong to the car, therefore quit
		tasks.forEach(function(task) {

			// check if the car's maintenance task is one of the existing types
			// anything not part of the existing list is not allowed
			if (MaintTasks.indexOf({ "name":task.toLowerCase() }) != -1) {
				var invalidList = MaintTasksController.getTask(task).invalidWith;

				// if it is, check if the car's engine is valid for the maint-task
				if (invalidList.indexOf(engine) !== -1) {
					status.push(task + ' maintenance task not valid for ' + engine + ' engine');
				}
			} else {
				status.push(task + ' is not a valid maintenance task');
			}
		});
	}
}

module.exports = {
	'validateCar': validateCar,
	'validateCarProperties': validateCarProperties,
	'validateMakeAndModels': validateMakeAndModels,
	'validateYearAndOdometer': validateYearAndOdometer,
	'validateEngineType': validateEngineType,
	'validateMaintTasks': validateMaintTasks
}