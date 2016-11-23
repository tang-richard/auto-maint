// Maintenance task controller

var MaintTasks = require('../models/MaintTasks');
exports.getMaintTasks = function(req, res) {
	res.status(200).send(MaintTasks);
};

exports.getTask = function(pTask) {
	var result = MaintTasks.filter(function(task) {
		return task.name.toLowerCase() == pTask.toLowerCase();
	});
	if (result.length === 0) {
		return {};
	} else {
		return result[0];
	}
}

exports.removeDuplicateMaintTasks = function(car) {
	var tasks = car.maintTasks;
	tasks = tasks.filter(function(item, index, inputArray) {
		return inputArray.indexOf(item) == index;
	});
	car.maintTasks = tasks;
}