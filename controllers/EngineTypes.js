// Engine type controller

var EngineTypesEnum = require('../models/EngineTypesEnum');

exports.getEngineTypes = function(req, res) {
	var types = [];
	Object.keys(EngineTypesEnum).forEach(function(key, index) {
		types.push(key);
	});
	res.status(200).json(types);
};