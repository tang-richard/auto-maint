// cars controller test

var assert = require('assert');
var CarsController = require('../controllers/cars');
var Cars = require('../models/cars');
var app = require('../bin/www');

var request = require('supertest')(app);

function addTestCars() {
	var a = new Cars({
		make: 'A',
		model: 'A'
	});
	var b = new Cars({
		make: 'B',
		model: 'B'
	});
	var c = new Cars({
		make: 'C',
		model: 'C'
	});
	a.save();
	b.save();
	c.save();
}

describe('Cars Controller', function() {

	var idToUpdate;
	var idToDelete;
	before(function(done) {
		addTestCars();

		done();
	});

	it('/GET three added test cars', function(done) {
		request.get('/cars')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end(function(err, res) {
				if (err) {
					console.log(err);
				} else {
					assert.equal(res.status, 200);
					assert.equal(res.body.length, 3);

					idToUpdate = res.body[0]._id;
					idToDelete = res.body[1]._id;
				}
				done();
			});
	});

	it('/POST valid car should be successful and return list of cars + 1', function(done) {
		var validCar = {
			'make': 'toyota',
			'model': 'Car',
			'year': '1999',
			'odometer': '123',
			'engineType': 'gas',
			'maintTasks': []
		};
		request.post('/cars')
			.send({ newCar: validCar })
			.type('json')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end(function(err, res) {
				if (err) {
					console.log(err);
				} else {
					assert.equal(res.status, 201);
					assert.equal(res.body.message, 'car added');
					assert.equal(res.body.cars.length, 4);

					var addedCars = res.body.cars.filter(function(car) {
						return car.make == validCar.make && car.model == validCar.model;
					});

					assert.equal(addedCars.length, 1);
					assert.equal(addedCars[0].make, validCar.make);
					assert.equal(addedCars[0].model, validCar.model);
					assert.equal(addedCars[0].year, validCar.year);
					assert.equal(addedCars[0].odometer, validCar.odometer);
					assert.equal(addedCars[0].engineType, validCar.engineType);
				}
				done();
			});
	});

	it('/POST invalid car should return status messages', function(done) {
		var invalidCar = {};
		request.post('/cars')
			.send({ newCar: invalidCar })
			.type('json')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end(function(err, res) {
				if (err) {
					console.log(err);
				} else {
					assert.equal(res.status, 400);
					assert.equal(res.body.message, 'Car not added');
					assert.equal(res.body.errors.length, 1);
					assert.equal(res.body.errors[0].includes('Missing car properties'), true);
				}
				done();
			});
	});

	it('/DELETE removes car from list of cars', function(done) {
		request.delete('/cars/' + idToDelete)
			.type('json')
			.expect('Content-Type', 'application/json; charset=utf-8')
			.end(function(err, res) {
				assert.equal(res.status, 202);
				assert.equal(res.body.message, 'car deleted');
				assert.equal(res.body.cars.length, 3);
				done();
			});
	});

	it('/PUT updates an existing car with make and model of Updated', function(done) {
		var updatedCar = {
			'_id': idToUpdate,
			'make': 'Updated',
			'model': 'Updated',
			'year': '1999',
			'odometer': '123',
			'engineType': 'gas',
			'maintTasks': []
		};
		request.put('/cars/' + idToUpdate)
			.send({ updatedCar: updatedCar })
			.type('json')
			.end(function(err, res) {
				assert.equal(res.status, 202);
				assert.equal(res.body.message, 'car updated');

				var updated = res.body.cars.filter(function(car) {
					return car._id == idToUpdate;
				});
				assert.equal(updated[0].make, 'Updated');
				assert.equal(updated[0].model, 'Updated');
				done();
			});
	});

	it('/PUT does not update a car with invalid entries', function(done) {
		var updatedCar = {
			'_id': idToUpdate,
			'make': 'Updated',
			'model': 'Updated',
			'year': '1999',
			'odometer': '123',
			'engineType': 'electric',
			'maintTasks': ['ReplaceFuelFilter']
		};
		request.put('/cars/' + idToUpdate)
			.send({ updatedCar: updatedCar })
			.type('json')
			.end(function(err, res) {
				assert.equal(res.status, 400);
				assert.equal(res.body.message, 'Car not updated');
				assert.equal(res.body.errors.length, 1);
				assert.equal(res.body.errors[0], 'ReplaceFuelFilter maintenance task not valid for electric engine');
				done();
			});
	});
	after(function(done) {
		Cars.remove({});
		done();
	});

});