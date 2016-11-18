
var EngineType = require('../models/EngineTypesEnum');

var tasks = [
	{
		"name": 'ChangeEngineOil',
		"description": "Change engine oil",
		"invalidWith": [EngineType.electric]
	},
	{
		"name": 'ReplaceOilFilter',
		"description": "Replace oil filter",
		"invalidWith": [EngineType.electric]
	},
	{
		"name": 'ReplaceAirFilter',
		"description": "Replace air filter",
		"invalidWith": []
	},
	{
		"name": 'ReplaceFuelFilter',
		"description": "Replace fuel filter",
		"invalidWith": [EngineType.electric]
	},

	{
		"name": 'ReplaceCabinFilter',
		"description": "Replace cabin filter",
		"invalidWith": []
	},
	{
		"name": 'ReplaceSparkPlugs',
		"description": "Replace spark plugs",
		"invalidWith": [EngineType.diesel]
	},
	{
		"name": 'TuneEngine',
		"description": "Tune engine",
		"invalidWith": []
	},
	{
		"name": 'RefillBrakeFluid',
		"description": "Refill brake fluid",
		"invalidWith": []
	},
	{
		"name": 'CheckTires',
		"description": "Check tires",
		"invalidWith": []
	}
];

module.exports = tasks;