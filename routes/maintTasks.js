var express = require('express');
var maintTasksController = require('../controllers/MaintTasks');

var router = express.Router();

router.get('/', maintTasksController.getMaintTasks);

module.exports = router;