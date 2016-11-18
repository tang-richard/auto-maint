function initialize() {
	getCars();
	getEngineTypes();
	getMaintTypes();
}

function getCars() {
 	$.get('http://localhost:3000/cars', function(cars) {
  		viewModel.cars(cars);
  		getEngineTypes();
 	});
 }

 function addNewCar() {
 	var newCar = {
		'make': $('#make').val(),
		'model': $('#model').val(),
		'year': $('#year').val(),
		'odometer': $('#odometer').val(),
		'engineType': $('#engineType').val(),
		'maintTasks': viewModel.newCarTasks()
	};

	$.ajax({
		type: "POST",
		url: "http://localhost:3000/cars",
		data: JSON.stringify({ newCar: newCar }),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {

			if (data.hasOwnProperty('errors')) {
				alert(data.errors);
			} else {
				viewModel.cars(data.cars);

				$('#make').val('');
				$('#model').val('');
				$('#year').val('');
				$('#odometer').val('');
				viewModel.newCarTasks([]);
			}
		},
		failure: function(err) {}
	});
 }

 function removeCar() {
 	var car = this;
 	$.ajax({
 		type: "DELETE",
 		url: "http://localhost:3000/cars/" + car._id,
 		dataType: "json",
 		success: function(data) {
 			viewModel.cars(data.cars);
 		}
 	});
 }

 function updateCar() {
 	var car = this;
 }

function getEngineTypes() {
	$.get('http://localhost:3000/engineTypes', function(engineTypes) {
 		viewModel.engineTypes(engineTypes);
 	});
}

function getMaintTypes() {
	$.get('http://localhost:3000/maintTasks', function(tasks) {
 		viewModel.maintTasks(tasks);
 	});
}

function addTask() {
	var task = viewModel.selectedMaintTask();
	viewModel.newCarTasks.push(task);
}
function removeNewTask() {
	var index = viewModel.newCarTasks.indexOf(String(this));
	viewModel.newCarTasks.splice(index, 1);
}

function ViewModel() {
 	var self = this;
 	self.cars = ko.observableArray();

 	self.engineTypes = ko.observableArray();
 	self.newCarTasks = ko.observableArray([]);
 	self.maintTasks = ko.observableArray();
 	self.selectedMaintTask = ko.observable();
 	self.selectedEngineType = ko.observable();

 	self.values = ko.observableArray(['one', 'two']);


 	self.newCarMake = ko.observable();
 	self.newCarModel = ko.observable();
 	self.newCarYear = ko.observable();
 	self.newCarOdometer = ko.observable();
 	self.newCarEngineType = ko.observable();
 	self.newCarMaintTasks = ko.observableArray();

}



var viewModel = new ViewModel();

ko.applyBindings(viewModel);