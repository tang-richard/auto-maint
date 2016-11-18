var mongoose = require('mongoose');


var carSchema = mongoose.Schema({
	make: String,
	model: String,
	year: Number,
	odometer: Number,
	engineType: String,
	maintTasks: []
});

module.exports = mongoose.model('Car', carSchema);