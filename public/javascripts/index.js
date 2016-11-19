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
				adding(false);
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

function addingCar() {

	if (adding() == false) {
		adding(true);
	} else {
		adding(false);
	}
	
}

 function editingCar() {

 	if (editing() == false) {
 		editing(true);
 		adding(false);

 		var car = this;
 		viewModel.editCarID(car._id);
	 	viewModel.editCarMake(car.make);
	 	viewModel.editCarModel(car.model);
	 	viewModel.editCarYear(car.year);
	 	viewModel.editCarOdometer(car.odometer);
	 	viewModel.editCarEngineType(car.engineType);
		viewModel.editCarMaintTasks(car.maintTasks);

	 	// make a copy of the car's maintTasks instead of working directly with it
	 	var maintTasksCopy = car.maintTasks.slice();

	 	viewModel.editAddedMaintTasks(maintTasksCopy);
 	} 
 }

 function cancelEdit() {
 	editing(false);
 	adding(false);

 	viewModel.editAddedMaintTasks([]);
 }

 function editAddMaintTask() {
 	viewModel.editAddedMaintTasks.push(viewModel.editSelectedMaintTask());
 }

 function editRemoveNewMaintTask() {
 	var index = viewModel.editAddedMaintTasks.indexOf(String(this));
	viewModel.editAddedMaintTasks.splice(index, 1);
 }


 function updateCar() {

 	var updatedCar = {
 		'_id': viewModel.editCarID(),
		'make': viewModel.editCarMake(),
		'model': viewModel.editCarModel(),
		'year': viewModel.editCarYear(),
		'odometer': viewModel.editCarOdometer(),
		'engineType': $('#editSelectedEngineType').val(),
		'maintTasks': viewModel.editAddedMaintTasks()
	};

	$.ajax({
		type: "PUT",
		url: "http://localhost:3000/cars/" + updatedCar._id,
		data: JSON.stringify({ updatedCar: updatedCar }),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data) {
			

		 	if (data.hasOwnProperty('errors')) {
				alert(data.errors);
			} else {
				viewModel.cars(data.cars);


				editing(false);
			 	adding(false);
			 	viewModel.editAddedMaintTasks([]);

			}
		}
	});
	

 	
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

var editing = ko.observable(false);
var adding = ko.observable(false);

function ViewModel() {
 	var self = this;
 	self.cars = ko.observableArray();

 	self.engineTypes = ko.observableArray();
 	self.newCarTasks = ko.observableArray([]);
 	self.maintTasks = ko.observableArray();
 	self.selectedMaintTask = ko.observable();
 	self.selectedEngineType = ko.observable();

 	self.editingCar = ko.observable();


 	self.newCarMake = ko.observable();
 	self.newCarModel = ko.observable();
 	self.newCarYear = ko.observable();
 	self.newCarOdometer = ko.observable();
 	self.newCarEngineType = ko.observable();
 	self.newCarMaintTasks = ko.observableArray();


 	self.editCarMake = ko.observable();
 	self.editCarModel = ko.observable();
 	self.editCarYear = ko.observable();
 	self.editCarOdometer = ko.observable();
 	self.editCarEngineType = ko.observable();
 	self.editCarMaintTasks = ko.observableArray();
 	self.editCarID = ko.observable();


 	self.editSelectedMaintTask = ko.observable();

 	self.editAddedMaintTasks = ko.observableArray();

}



var viewModel = new ViewModel();

ko.applyBindings(viewModel);