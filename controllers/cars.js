var Cars = require('../models/cars');
var EngineTypes = require('../models/EngineTypesEnum');
// require('../routes/cars');
var MaintTasksController = require('./MaintTasks');
var s = require("underscore.string");

exports.getCar = function(req, res) {
	res.send('getting a single car');
};

exports.getCars = function(req, res) {
	// res.send('Getting all the cars');
	Cars.find({}, function(err, cars) {
		if (!err) {
			res.send(cars);
		} else {
			console.log('error');
		}
	});
};

exports.postCars = function(req, res) {
	var status = validateCar(req.body.newCar);
	if (status.length === 0) {
		var newCar = new Cars(req.body.newCar);
		newCar.save(function(err) {
			if (err) {
				console.log(err);
			} else {
				Cars.find({}, function(err, cars) {
					res.status(201).send(JSON.stringify({ 'message': 'car added', 'cars': cars }));
				});
			}
		});
	} else {
		res.send(JSON.stringify({ 'message': 'Car not added', 'errors': status }));
	}
};

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
			var invalidList = MaintTasksController.getTask(task).invalidWith;
			if (invalidList.indexOf(engine) !== -1) {
				status.push(task + ' maintenance task not valid for ' + engine + ' engine');
			}
		});
	}
}



exports.deleteCar = function(req, res) {
	var car = req.body;
	Cars.find({ "_id":req.params.id }).remove(function(err) {
		if (err) {
			console.log('something happened here');
		} else {
			Cars.find({}, function(err, cars) {
				res.send(JSON.stringify({ 'message': 'car deleted', 'cars': cars }));
			});
		}
	});
}

exports.updateCar = function(req, res) {
	var status = validateCar(req.body.updatedCar);
	if (status.length === 0) {
		Cars.findOneAndUpdate({ '_id': req.body.updatedCar._id }, req.body.updatedCar, function(err, doc) {
			Cars.find({}, function(err, cars) {
				res.status(201).send(JSON.stringify({ 'message': 'car updated', 'cars': cars }));
			});
		});
	} else {
		res.send(JSON.stringify({ 'message': 'Car not updated', 'errors': status }));
	}
}