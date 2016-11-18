var express = require('express');
var engineTypesController = require('../controllers/EngineTypes');

var router = express.Router();

router.get('/', engineTypesController.getEngineTypes);

module.exports = router;