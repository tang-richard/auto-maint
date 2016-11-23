var Cars = require('../models/cars');
var CarsValidator = require('./CarsValidator');

exports.getCar = function(req, res) {
	res.send('getting a single car');
};

exports.getCars = function(req, res) {
	Cars.find({}, function(err, cars) {
		if (err) {
			res.status(502).json('error: no Cars collection');
		} else {
			res.status(200).json(cars);
		}
	});
};

exports.postCars = function(req, res) {
	var status = CarsValidator.validateCar(req.body.newCar);

	if (status.length === 0) {
		var newCar = new Cars(req.body.newCar);
		newCar.save(function(err) {
			if (err) {
				res.status(502).json('error: no Cars collection');
			} else {
				Cars.find({}, function(err, cars) {
					res.status(201).json({ 'message': 'car added', 'cars': cars });
				});
			}
		});
	} else {
		res.status(400).json({ 'message': 'Car not added', 'errors': status });
	}
};

exports.deleteCar = function(req, res) {
	var car = req.body;
	Cars.find({ "_id":req.params.id }).remove(function(err) {
		if (err) {
			res.status(502).json('error: no Cars collection');
		} else {
			Cars.find({}, function(err, cars) {
				res.status(202).json({ 'message': 'car deleted', 'cars': cars });
			});
		}
	});
}

exports.updateCar = function(req, res) {
	var status = CarsValidator.validateCar(req.body.updatedCar);
	if (status.length === 0) {
		Cars.findOneAndUpdate({ '_id': req.body.updatedCar._id }, req.body.updatedCar, function(err, doc) {
			if (err) {
				res.status(502).json('error: no Cars collection');
			} else { 
				Cars.find({}, function(err, cars) {
					res.status(202).json({ 'message': 'car updated', 'cars': cars });
				});
			}
		});
	} else {
		res.status(400).json({ 'message': 'Car not updated', 'errors': status });
	}
}
