var express = require('express');
var carsController = require('../controllers/cars');

var router = express.Router();

router.get('/', carsController.getCars);

router.get('/:id', carsController.getCar);
router.post('/', carsController.postCars);
router.delete('/:id', carsController.deleteCar);
router.put('/:id', carsController.updateCar);

module.exports = router;