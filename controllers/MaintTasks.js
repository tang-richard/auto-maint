// Maintenance task controller

var MaintTasks = require('../models/MaintTasks');
exports.getMaintTasks = function(req, res) {
	res.send(MaintTasks);
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