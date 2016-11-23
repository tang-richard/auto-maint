Auto Maintenance Tracker
========================

A Node.js project to implement a basic auto maintenance tracker. 

Installation
------------

The project requires mongodb running locally. This database can be changed in the mongoose connection string in ```bin/www```

After, install dependencies:

```
npm install
```

Run the app:

```
npm start
```

Navigate to ```http://localhost:3000```

To run tests: 
```
npm test
```

Data Model
----------

This project uses three models to represent cars and their maintenance tasks: Cars, Engine Type, and Maintenance Tasks (shortened to 'MaintTasks' for ease of writing).

Cars contain a make (e.g., "Toyota"), model (e.g., "4runner"), and an Engine Type (one of "gas", "diesel", "electric", or "hybrid"). Cars may also include the year of model, odometer reading, and a list of assigned maintenance tasks being applied to it. 

MaintTasks are predefined in models/MaintTasks. Each MaintTask contains a name, description, and a list of EngineTypes they cannot be applied to--for example, one does not need to change the engine oil for an electric car, or change sparkplugs for a diesel. 